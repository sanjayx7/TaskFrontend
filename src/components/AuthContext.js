// AuthContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state

  // Check if the access token exists in localStorage when the app loads
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false); // Once we've checked the token, stop loading
  }, []);

  // Helper function to refresh the access token
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/token/refresh/', {
          refresh: refreshToken,
        });

        localStorage.setItem('access_token', response.data.access);
        setIsAuthenticated(true);
        return response.data.access; // Return the new access token
      } else {
        logout(); // If no refresh token, log the user out
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      logout(); // If an error occurs (e.g., refresh token expired), log out
    }
  };

  // Function to make API calls that require authentication
  const apiCallWithRefresh = async (config) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const updatedConfig = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios(updatedConfig);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If 401 (Unauthorized), attempt to refresh the token
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          // Retry the original request with the new token
          const updatedConfig = {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${newAccessToken}`,
            },
          };
          const retryResponse = await axios(updatedConfig);
          return retryResponse;
        }
      } else {
        throw error; // Rethrow any other errors
      }
    }
  };

  // Login function to be called after a successful login
  const login = (accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    setIsAuthenticated(true);
  };

  // Logout function to be called when user logs out
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, apiCallWithRefresh, refreshAccessToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
