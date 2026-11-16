import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000/api';
// Normalize base URL so it cleanly ends with /api
const baseURL = rawBaseURL.endsWith('/api')
  ? rawBaseURL
  : `${rawBaseURL.replace(/\/+$/, '')}/api`;

export const isMockMode =
  import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === 'true';

const api = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
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
      if (
        typeof window !== 'undefined' &&
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/'
      ) {
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
