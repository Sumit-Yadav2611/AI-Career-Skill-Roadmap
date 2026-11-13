import api, { isMockMode } from './api';
import { initialUser } from './mockData';

const createMockToken = (email) =>
  'mock-jwt-token-' + btoa(email) + '-' + Date.now();

export const authService = {
  async login(email, password) {
    if (isMockMode) {
      await new Promise((res) => setTimeout(res, 500));

      const normalizedEmail = email.trim().toLowerCase();
      const savedUserJson = localStorage.getItem('csrp_user');
      let savedUser = null;

      if (savedUserJson) {
        try {
          savedUser = JSON.parse(savedUserJson);
        } catch {
          localStorage.removeItem('csrp_user');
          localStorage.removeItem('csrp_token');
        }
      }

      let user;
      if (savedUser?.email?.toLowerCase() === normalizedEmail) {
        user = savedUser;
      } else if (normalizedEmail === initialUser.email.toLowerCase()) {
        // The sample account is available only through an explicit demo login.
        user = {
          ...initialUser,
          userSkills: initialUser.userSkills.map((skill) => ({ ...skill })),
          assessmentHistory: initialUser.assessmentHistory.map((attempt) => ({ ...attempt })),
          notifications: initialUser.notifications.map((notification) => ({ ...notification })),
        };
      } else {
        throw new Error(
          'No local account exists for this email. Register first or use the clearly labeled demo account.'
        );
      }

      const token = createMockToken(normalizedEmail);
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

      // New mock registrations start with an empty profile. Never copy the
      // pre-populated demo student's skills, scores, or assessment history.
      const user = {
        ...userData,
        id: 'usr_' + Date.now(),
        name: userData.name?.trim() || '',
        email: userData.email?.trim() || '',
        profileScore: null,
        careerReadiness: null,
        targetCareerId: userData.targetCareerId || null,
        userSkills: [],
        assessmentHistory: [],
        notifications: [],
      };

      // Never persist submitted credentials in the browser-side demo profile.
      delete user.password;
      delete user.confirmPassword;

      const token = createMockToken(user.email);
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
    const token = localStorage.getItem('csrp_token');
    const userStr = localStorage.getItem('csrp_user');

    // A visitor must not become authenticated merely because demo data exists
    // in the source code. A session requires both the token and saved user.
    if (!token || !userStr) {
      this.logout();
      return null;
    }

    try {
      const user = JSON.parse(userStr);
      if (!user || typeof user !== 'object' || !user.email) {
        this.logout();
        return null;
      }
      return user;
    } catch {
      this.logout();
      return null;
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
      if (!current) {
        throw new Error('Your session has expired. Please sign in again.');
      }
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
