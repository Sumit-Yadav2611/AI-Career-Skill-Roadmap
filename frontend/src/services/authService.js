import api, { isMockMode } from './api';
import { initialUser } from './mockData';

const MOCK_USERS_KEY = 'csrp_mock_users';

const createMockToken = (email) =>
  'mock-jwt-token-' + btoa(email) + '-' + Date.now();

const readMockUsers = () => {
  try {
    const stored = localStorage.getItem(MOCK_USERS_KEY);
    const users = stored ? JSON.parse(stored) : {};
    return users && typeof users === 'object' && !Array.isArray(users) ? users : {};
  } catch {
    localStorage.removeItem(MOCK_USERS_KEY);
    return {};
  }
};

const storeMockUser = (user) => {
  if (!user?.email) return;
  const users = readMockUsers();
  users[user.email.trim().toLowerCase()] = user;
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

export const authService = {
  async login(email, password) {
    if (isMockMode) {
      await new Promise((res) => setTimeout(res, 400));

      const normalizedEmail = email.trim().toLowerCase();
      const mockUsers = readMockUsers();
      const registeredUser = mockUsers[normalizedEmail];

      let user;
      if (registeredUser) {
        user = registeredUser;
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
          'No local demo account exists for this email. Register first or use the sample demo account.'
        );
      }

      // Mock mode is only a local UI preview: it deliberately does not verify
      // passwords. Never enter a real password while VITE_USE_MOCK is enabled.
      const token = createMockToken(normalizedEmail);
      localStorage.setItem('csrp_token', token);
      localStorage.setItem('csrp_user', JSON.stringify(user));
      storeMockUser(user);
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
      await new Promise((res) => setTimeout(res, 400));

      const normalizedEmail = userData.email?.trim().toLowerCase();
      if (!normalizedEmail) throw new Error('Enter a valid email address.');

      const mockUsers = readMockUsers();
      if (mockUsers[normalizedEmail]) {
        throw new Error('A local demo account with this email already exists. Please sign in instead.');
      }

      // New local demo accounts begin with an empty profile and no fabricated
      // skills, scores, assessment attempts, or roadmap progress.
      const user = {
        ...userData,
        id: 'usr_' + Date.now(),
        name: userData.name?.trim() || '',
        email: normalizedEmail,
        profileScore: null,
        careerReadiness: null,
        targetCareerId: userData.targetCareerId || null,
        userSkills: [],
        assessmentHistory: [],
        notifications: [],
      };

      delete user.password;
      delete user.confirmPassword;

      const token = createMockToken(user.email);
      localStorage.setItem('csrp_token', token);
      localStorage.setItem('csrp_user', JSON.stringify(user));
      storeMockUser(user);
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
    if (isMockMode) storeMockUser(user);
  },

  logout() {
    // Keep local mock profile records so the same development accounts can
    // sign in again. Only the active browser session is cleared.
    localStorage.removeItem('csrp_token');
    localStorage.removeItem('csrp_user');
  },

  async updateProfile(profileData) {
    if (isMockMode) {
      await new Promise((res) => setTimeout(res, 300));
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
