
const blacklist = new Set(); 

// Add token to blacklist
export const addToBlacklist = (token) => {
  blacklist.add(token);
};

// Check if token is blacklisted
export const isBlacklisted = (token) => {
  return blacklist.has(token);
};

// Remove token from blacklist (optional, for example, after a certain time)
export const removeFromBlacklist = (token) => {
  blacklist.delete(token);
};

// Clear all blacklisted tokens (for cleanup purposes, if needed)
export const clearBlacklist = () => {
  blacklist.clear();
};
