import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000/api';

// Mock data is a development-only convenience. A production build must always
// use the configured API, even if VITE_USE_MOCK was accidentally set to true.
export const isMockMode =
  import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === 'true';

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('csrp_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('csrp_token');
      localStorage.removeItem('csrp_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
