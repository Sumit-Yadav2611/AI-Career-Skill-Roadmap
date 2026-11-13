import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to load user session', error);
      setUser(null);
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
      (skill) => skill.name.toLowerCase() === newSkill.name.toLowerCase()
    );
    if (exists) return user;

    const skillObj = {
      id: 'us_' + Date.now(),
      name: newSkill.name,
      proficiency: newSkill.proficiency || 'Not assessed',
      category: newSkill.category || 'Other',
      source: 'self-reported',
      verified: false
    };

    return await updateUserProfile({
      userSkills: [...(user.userSkills || []), skillObj]
    });
  };

  const removeSkill = async (skillId) => {
    if (!user) return;
    const updatedSkills = (user.userSkills || []).filter((skill) => skill.id !== skillId);
    return await updateUserProfile({ userSkills: updatedSkills });
  };

  const syncResumeSkills = async (extractedSkills) => {
    if (!user) return;
    const currentSkills = user.userSkills || [];
    const currentSkillNames = new Set(currentSkills.map((skill) => skill.name.toLowerCase()));

    const newSkillsToAdd = extractedSkills
      .filter((name) => !currentSkillNames.has(name.toLowerCase()))
      .map((name, index) => ({
        id: `us_resume_${Date.now()}_${index}`,
        name,
        proficiency: 'Not assessed',
        category: 'Resume extracted',
        source: 'resume',
        verified: false
      }));

    if (newSkillsToAdd.length === 0) return user;

    return await updateUserProfile({
      userSkills: [...currentSkills, ...newSkillsToAdd]
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
