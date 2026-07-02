import axios from 'axios';

// Retrieve base URL from environment variable or fallback to localhost
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Dynamically attach Bearer token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors, specifically 401 Unauthorized to auto-logout
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Token expired or unauthorized. Logging out...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Auto-redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }

    // Normalize error format for downstream handling
    const normalizedError = {
      message: error.response?.data?.message || error.message || 'Something went wrong',
      status: error.response?.status,
      data: error.response?.data,
    };

    return Promise.reject(normalizedError);
  }
);

export default apiClient;
