import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '@/state';

export const useAccessProtectedRoute = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const accessProtectedRoute = async (url, options) => {
    try {
      // Make the initial request with the current tokens
      let response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token.accessToken}`,
          'x-refresh-token': token.refreshToken,
        },
      });

      let data = await response.json(); // Parse response data
      
      

      // Check if the response contains a message indicating token refresh
      if (data.message === "Access token refreshed.") {
        //console.log("Token was refreshed",data);

        dispatch(setLogin({
          user: data.user,
          token: {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          },
        }));

        // Retry the original request with the new tokens
        response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${data.accessToken}`,
            'x-refresh-token': data.refreshToken, // Use the refreshed tokens
          },
        });

        data = await response.json(); // Parse the new response data
      }

      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return data; 
    } catch (error) {
      console.error("Error accessing protected route:", error);
      throw error;
    }
  };

  return accessProtectedRoute; 
};
