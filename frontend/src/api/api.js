import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Add auth token to all requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Handle response errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem("token");
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      console.error('Forbidden access:', error.response.data.message);
    } else if (error.response?.status === 500) {
      console.error('Server error:', error.response.data.message);
    } else if (!error.response && !navigator.onLine) {
      console.error('Network error: You are offline');
    }
    return Promise.reject(error);
  }
);

export default api;
