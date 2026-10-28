import api, { isMockMode } from './api';
import { initialUser } from './mockData';

export const authService = {
  async login(email, password) {
    if (isMockMode) {
      await new Promise((res) => setTimeout(res, 500));
      // Simple mock check
      const savedUser = localStorage.getItem('csrp_user');
      const user = savedUser ? JSON.parse(savedUser) : { ...initialUser, email };
      user.email = email;
      const token = 'mock-jwt-token-' + btoa(email) + '-' + Date.now();
      localStorage.setItem('csrp_token', token);
      localStorage.setItem('csrp_user', JSON.stringify(user));
      return { user, token };
    }

    const response = await api.post('/auth/login', { email, password });
    const { user, token } = response.data;
    localStorage.setItem('csrp_token', token);
    localStorage.setItem('csrp_user', JSON.stringify(user));
    return { user, token };
  },

  async register(userData) {
    if (isMockMode) {
      await new Promise((res) => setTimeout(res, 600));
      const user = {
        ...initialUser,
        ...userData,
        id: 'usr_' + Date.now(),
        profileScore: 75,
        careerReadiness: 60,
      };
      const token = 'mock-jwt-token-' + btoa(userData.email) + '-' + Date.now();
      localStorage.setItem('csrp_token', token);
      localStorage.setItem('csrp_user', JSON.stringify(user));
      return { user, token };
    }

    const response = await api.post('/auth/register', userData);
    const { user, token } = response.data;
    localStorage.setItem('csrp_token', token);
    localStorage.setItem('csrp_user', JSON.stringify(user));
    return { user, token };
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('csrp_user');
    if (!userStr) return initialUser;
    try {
      return JSON.parse(userStr);
    } catch {
      return initialUser;
    }
  },

  saveUser(user) {
    localStorage.setItem('csrp_user', JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem('csrp_token');
    localStorage.removeItem('csrp_user');
  },

  async updateProfile(profileData) {
    if (isMockMode) {
      await new Promise((res) => setTimeout(res, 400));
      const current = this.getCurrentUser();
      const updated = { ...current, ...profileData };
      this.saveUser(updated);
      return updated;
    }

    const response = await api.put('/profile', profileData);
    const updated = response.data;
    this.saveUser(updated);
    return updated;
  }
};
