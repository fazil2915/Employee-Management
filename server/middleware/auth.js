import jwt from 'jsonwebtoken';
import { addToBlacklist, isBlacklisted } from './blacklist.js';

// Helper function to generate tokens
export const generateTokens = (userId) => {
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET_REFRESH, { expiresIn: '1d' });
    return { accessToken, refreshToken };
};

// Authenticate and refresh token middleware
export const authenticateToken = async (req, res, next) => {
    try {
        
        let accessToken = req.header('Authorization');

        if (!accessToken) {
            return res.status(403).json({ message: 'Access Denied. No token provided.' });
        }

        if (accessToken.startsWith('Bearer ')) {
            accessToken = accessToken.slice(7, accessToken.length).trimLeft();
        }

        // Check if the access token is blacklisted
        if (isBlacklisted(accessToken)) {
            return res.status(403).json({ message: 'Access Denied. Token is blacklisted.' });
        }

        try {
            // Verify access token
            const verified = jwt.verify(accessToken, process.env.JWT_SECRET);
            req.user = verified;
            return next(); // Proceed to the next middleware
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                // If access token is expired, handle the refresh token flow

                // Get refresh token from custom header 'x-refresh-token'
                const refreshToken = req.header('x-refresh-token');
                console.log('Refresh Token:', refreshToken); // Debugging line

                if (!refreshToken) {
                    return res.status(403).json({ message: 'No refresh token provided.' });
                }

                // Check if the refresh token is blacklisted
                if (isBlacklisted(refreshToken)) {
                    return res.status(403).json({ message: 'Refresh token is blacklisted.' });
                }


                
                try {
                    // Verify refresh token
                    const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);

                    // Blacklist the expired access token
                    addToBlacklist(accessToken);

                    // Generate new access and refresh tokens
                    const newTokens = generateTokens(decodedRefresh.id);

                    // Send new tokens to the client
                    res.status(200).json({
                        message: 'Access token refreshed.',
                        accessToken: newTokens.accessToken,
                        refreshToken: newTokens.refreshToken,
                    });

                } catch (refreshError) {
                    return res.status(403).json({ message: 'Invalid refresh token.' });
                }
            } else {
                return res.status(403).json({ message: 'Invalid access token.' });
            }
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
