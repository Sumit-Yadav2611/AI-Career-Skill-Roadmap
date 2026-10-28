import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial user state
    try {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    } catch (e) {
      console.error('Failed to load user', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      setUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const result = await authService.register(userData);
      setUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUserProfile = async (updates) => {
    const updated = await authService.updateProfile(updates);
    setUser(updated);
    return updated;
  };

  const addSkill = async (newSkill) => {
    if (!user) return;
    const exists = (user.userSkills || []).some(
      (s) => s.name.toLowerCase() === newSkill.name.toLowerCase()
    );
    if (exists) return user;

    const skillObj = {
      id: 'us_' + Date.now(),
      name: newSkill.name,
      proficiency: newSkill.proficiency || 'Intermediate',
      category: newSkill.category || 'General'
    };

    const updatedSkills = [...(user.userSkills || []), skillObj];
    return await updateUserProfile({ userSkills: updatedSkills });
  };

  const removeSkill = async (skillId) => {
    if (!user) return;
    const updatedSkills = (user.userSkills || []).filter((s) => s.id !== skillId);
    return await updateUserProfile({ userSkills: updatedSkills });
  };

  const syncResumeSkills = async (extractedSkills) => {
    if (!user) return;
    const currentSkills = user.userSkills || [];
    const currentSkillNames = new Set(currentSkills.map((s) => s.name.toLowerCase()));

    const newSkillsToAdd = extractedSkills
      .filter((name) => !currentSkillNames.has(name.toLowerCase()))
      .map((name, i) => ({
        id: `us_synced_${Date.now()}_${i}`,
        name,
        proficiency: 'Intermediate',
        category: 'Parsed from Resume'
      }));

    if (newSkillsToAdd.length === 0) return user;

    const merged = [...currentSkills, ...newSkillsToAdd];
    return await updateUserProfile({
      userSkills: merged,
      profileScore: Math.min((user.profileScore || 80) + 10, 100)
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUserProfile,
        addSkill,
        removeSkill,
        syncResumeSkills
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
