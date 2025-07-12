import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000, // 10 seconds timeout
  withCredentials: true, // send cookies with requests (if your backend uses them)
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // assuming JWT stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling & refreshing tokens (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors here
    if (error.response) {
      // For example, logout user if 401 Unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login'; // redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default api;
