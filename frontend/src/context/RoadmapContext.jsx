import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { careerService } from '../services/careerService';
import { useAuth } from './AuthContext';

const RoadmapContext = createContext(null);

export const RoadmapProvider = ({ children }) => {
  const { user, updateUserProfile } = useAuth();
  const userIdentity = user?.id || user?.email || null;

  const [careers, setCareers] = useState([]);
  const [activeCareerId, setActiveCareerId] = useState(user?.targetCareerId || null);
  const [activeCareer, setActiveCareer] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [skillGap, setSkillGap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load available careers and refresh the selected role when the signed-in
  // student changes. This prevents stale career data leaking between sessions.
  useEffect(() => {
    let cancelled = false;

    const fetchCareers = async () => {
      if (!userIdentity) {
        setActiveCareerId(null);
        setActiveCareer(null);
        setRoadmap(null);
        setSkillGap(null);
        setLoading(false);
        return;
      }

      try {
        setError('');
        const data = await careerService.getCareers();
        if (cancelled) return;
        setCareers(Array.isArray(data) ? data : []);
        setActiveCareerId(user?.targetCareerId || null);
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to fetch careers', err);
          setCareers([]);
          setError(err?.response?.data?.message || 'Unable to load career options.');
        }
      }
    };

    fetchCareers();
    return () => {
      cancelled = true;
    };
  }, [userIdentity, user?.targetCareerId]);

  // Load role data only for the currently authenticated student.
  useEffect(() => {
    let cancelled = false;

    const loadCareerDetails = async () => {
      if (!userIdentity || !activeCareerId) {
        setActiveCareer(null);
        setRoadmap(null);
        setSkillGap(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const career = await careerService.getCareerById(activeCareerId);
        if (cancelled) return;

        const [rm, gap] = await Promise.all([
          careerService.getRoadmap(activeCareerId, userIdentity),
          careerService.getSkillGap(activeCareerId, user?.userSkills || [])
        ]);

        if (cancelled) return;
        setActiveCareer(career);
        setRoadmap(rm);
        setSkillGap(gap);
      } catch (err) {
        if (!cancelled) {
          console.error('Error loading roadmap/skill gap', err);
          setActiveCareer(null);
          setRoadmap(null);
          setSkillGap(null);
          setError(err?.response?.data?.message || err?.message || 'Unable to load this career plan.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadCareerDetails();
    return () => {
      cancelled = true;
    };
  }, [activeCareerId, userIdentity, user?.userSkills]);

  const selectTargetCareer = async (careerId) => {
    const selectedCareer = careers.find((career) => career.id === careerId);
    if (!selectedCareer) {
      throw new Error('Please select an available career option.');
    }

    // Persist first so a failed API request cannot leave the UI showing a
    // target role that was never saved to the student's profile.
    if (user) {
      await updateUserProfile({ targetCareerId: careerId });
    }
    setActiveCareerId(careerId);
  };

  const toggleMilestone = async (milestoneId, isCompleted) => {
    if (!activeCareerId || !userIdentity) {
      throw new Error('Select a target career before updating roadmap progress.');
    }

    try {
      const updated = await careerService.updateMilestone(
        activeCareerId,
        milestoneId,
        isCompleted,
        userIdentity
      );
      setRoadmap(updated);

      if (isCompleted) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#6366f1', '#10b981', '#f59e0b']
        });
      }
    } catch (err) {
      console.error('Failed to update milestone', err);
      throw err;
    }
  };

  return (
    <RoadmapContext.Provider
      value={{
        careers,
        activeCareerId,
        activeCareer,
        roadmap,
        skillGap,
        loading,
        error,
        selectTargetCareer,
        toggleMilestone
      }}
    >
      {children}
    </RoadmapContext.Provider>
  );
};

export const useRoadmap = () => {
  const context = useContext(RoadmapContext);
  if (!context) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
};

export default RoadmapProvider;
