import api, { isMockMode } from './api';
import { initialUser } from './mockData';
import { aiService } from './aiService';

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
  /**
   * Pre-warm backend link as soon as user visits Login or Register page.
   * This wakes up the Render container in the background to eliminate cold start delays.
   */
  async prewarmBackend() {
    try {
      await api.get('/auth/me');
    } catch {
      // 401 is expected if not logged in, but the request successfully wakes up the backend instance!
      console.log('Backend link called on page visit (Render pre-warm active)');
    }
  },

  async login(email, password) {
    const normalizedEmail = email.trim().toLowerCase();

    if (isMockMode) {
      await new Promise((res) => setTimeout(res, 300));
      const mockUsers = readMockUsers();
      const registeredUser = mockUsers[normalizedEmail];

      let user;
      if (registeredUser) {
        user = registeredUser;
      } else if (normalizedEmail === initialUser.email.toLowerCase()) {
        user = {
          ...initialUser,
          userSkills: initialUser.userSkills.map((s) => ({ ...s })),
          assessmentHistory: initialUser.assessmentHistory.map((a) => ({ ...a })),
          notifications: initialUser.notifications.map((n) => ({ ...n })),
        };
      } else {
        // Fallback demo account
        const isAdmin = normalizedEmail.includes('admin');
        user = {
          id: 'usr_' + Date.now(),
          name: normalizedEmail.split('@')[0],
          fullName: normalizedEmail.split('@')[0],
          email: normalizedEmail,
          role: isAdmin ? 'ADMIN' : 'STUDENT',
          isAdmin,
          careerReadiness: 75,
          userSkills: [
            { id: 'sk_1', name: 'JavaScript', proficiency: 'Advanced', category: 'Programming Language' },
            { id: 'sk_2', name: 'React.js', proficiency: 'Intermediate', category: 'Frontend' },
            { id: 'sk_3', name: 'Node.js', proficiency: 'Beginner', category: 'Backend' },
          ],
          assessmentHistory: [],
          notifications: [],
        };
      }

      const token = createMockToken(normalizedEmail);
      localStorage.setItem('csrp_token', token);
      localStorage.setItem('csrp_user', JSON.stringify(user));
      storeMockUser(user);

      // Trigger AI service ping and store in local storage
      aiService.pingAiService().catch(() => {});

      return { user, token };
    }

    try {
      // Connect to real Spring Boot backend
      const response = await api.post('/auth/login', {
        email: normalizedEmail,
        password,
      });

      const token = response.data.token;
      if (!token) {
        throw new Error('No authentication token received from backend.');
      }

      localStorage.setItem('csrp_token', token);

      let authorities = [];
      let isAdmin = normalizedEmail.includes('admin');

      try {
        const meRes = await api.get('/auth/me');
        authorities = meRes.data?.authorities || [];
        if (authorities.includes('ROLE_ADMIN')) {
          isAdmin = true;
        }
      } catch (err) {
        console.warn('Could not fetch authorities from /auth/me:', err.message);
      }

      const user = {
        id: response.data.email || normalizedEmail,
        name: response.data.fullName || normalizedEmail.split('@')[0],
        fullName: response.data.fullName || normalizedEmail.split('@')[0],
        email: response.data.email || normalizedEmail,
        role: isAdmin ? 'ADMIN' : 'STUDENT',
        isAdmin,
        authorities,
        userSkills: [],
        assessmentHistory: [],
        notifications: [],
      };

      localStorage.setItem('csrp_user', JSON.stringify(user));

      // NEW FEATURE: Whenever user logs in, AI service URL is called and response saved in localStorage
      try {
        await aiService.pingAiService();
      } catch (aiErr) {
        console.warn('AI service on login notice:', aiErr);
      }

      return { user, token };
    } catch (error) {
      console.error('Backend login error:', error);
      let message =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message;

      if (error?.code === 'ECONNABORTED' || (error?.message && error.message.includes('timeout'))) {
        message =
          'Backend is waking up on Render (free tier cold start takes ~40-60s). Please click Sign In again in a few seconds!';
      } else if (!message || typeof message !== 'string') {
        message = 'Invalid email or password';
      }
      throw new Error(message);
    }
  },

  async register(userData) {
    const normalizedEmail = userData.email?.trim().toLowerCase();
    if (!normalizedEmail) throw new Error('Enter a valid email address.');

    if (isMockMode) {
      await new Promise((res) => setTimeout(res, 300));
      const mockUsers = readMockUsers();
      if (mockUsers[normalizedEmail]) {
        throw new Error('A local demo account with this email already exists.');
      }

      const isAdmin = Boolean(userData.isAdmin) || normalizedEmail.includes('admin');
      const user = {
        ...userData,
        id: 'usr_' + Date.now(),
        name: userData.name?.trim() || normalizedEmail.split('@')[0],
        fullName: userData.fullName || userData.name?.trim() || normalizedEmail.split('@')[0],
        email: normalizedEmail,
        role: isAdmin ? 'ADMIN' : 'STUDENT',
        isAdmin,
        userSkills: [],
        assessmentHistory: [],
        notifications: [],
      };

      const token = createMockToken(user.email);
      localStorage.setItem('csrp_token', token);
      localStorage.setItem('csrp_user', JSON.stringify(user));
      storeMockUser(user);

      // Trigger AI service ping and store in local storage
      aiService.pingAiService().catch(() => {});

      return { user, token };
    }

    try {
      const payload = {
        fullName: userData.name || userData.fullName || normalizedEmail.split('@')[0],
        email: normalizedEmail,
        password: userData.password,
      };

      const endpoint = userData.isAdmin ? '/auth/register/admin' : '/auth/register';
      await api.post(endpoint, payload);

      // Auto login upon successful registration
      return await this.login(normalizedEmail, userData.password);
    } catch (error) {
      console.error('Backend register error:', error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        'Registration failed. Please verify your information and try again.';
      throw new Error(typeof message === 'string' ? message : 'Registration failed');
    }
  },

  getCurrentUser() {
    const token = localStorage.getItem('csrp_token');
    const userStr = localStorage.getItem('csrp_user');

    if (!token || !userStr) {
      return null;
    }

    try {
      const user = JSON.parse(userStr);
      if (!user || typeof user !== 'object' || !user.email) {
        return null;
      }
      return user;
    } catch {
      return null;
    }
  },

  saveUser(user) {
    localStorage.setItem('csrp_user', JSON.stringify(user));
    if (isMockMode) storeMockUser(user);
  },

  logout() {
    localStorage.removeItem('csrp_token');
    localStorage.removeItem('csrp_user');
    api.post('/auth/logout').catch(() => {});
  },

  async updateProfile(profileData) {
    const current = this.getCurrentUser();
    const updated = { ...current, ...profileData };
    this.saveUser(updated);

    if (!isMockMode) {
      try {
        await api.put('/profile', profileData);
      } catch (err) {
        console.warn('Backend profile update notice:', err.message);
      }
    }
    return updated;
  },
};

export default authService;
