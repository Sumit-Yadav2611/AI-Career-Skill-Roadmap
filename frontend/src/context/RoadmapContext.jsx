import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { careerService } from '../services/careerService';
import { useAuth } from './AuthContext';

const RoadmapContext = createContext(null);

export const RoadmapProvider = ({ children }) => {
  const { user, updateUserProfile } = useAuth();
  const [careers, setCareers] = useState([]);
  const [activeCareerId, setActiveCareerId] = useState(user?.targetCareerId || null);
  const [activeCareer, setActiveCareer] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [skillGap, setSkillGap] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load available careers. A new user must explicitly choose a target role.
  useEffect(() => {
    let cancelled = false;

    const fetchCareers = async () => {
      try {
        const data = await careerService.getCareers();
        if (cancelled) return;
        setCareers(Array.isArray(data) ? data : []);
        setActiveCareerId(user?.targetCareerId || null);
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to fetch careers', err);
          setCareers([]);
        }
      }
    };

    fetchCareers();
    return () => {
      cancelled = true;
    };
  }, [user?.targetCareerId]);

  // Load details only after the student has selected a target role.
  useEffect(() => {
    let cancelled = false;

    const loadCareerDetails = async () => {
      if (!activeCareerId) {
        setActiveCareer(null);
        setRoadmap(null);
        setSkillGap(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const career = await careerService.getCareerById(activeCareerId);
        if (cancelled) return;
        setActiveCareer(career);

        const [rm, gap] = await Promise.all([
          careerService.getRoadmap(activeCareerId),
          careerService.getSkillGap(activeCareerId, user?.userSkills || [])
        ]);

        if (cancelled) return;
        setRoadmap(rm);
        setSkillGap(gap);
      } catch (err) {
        if (!cancelled) {
          console.error('Error loading roadmap/skill gap', err);
          setActiveCareer(null);
          setRoadmap(null);
          setSkillGap(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadCareerDetails();
    return () => {
      cancelled = true;
    };
  }, [activeCareerId, user?.userSkills]);

  const selectTargetCareer = async (careerId) => {
    setActiveCareerId(careerId);
    if (user) {
      await updateUserProfile({ targetCareerId: careerId });
    }
  };

  const toggleMilestone = async (milestoneId, isCompleted) => {
    try {
      const updated = await careerService.updateMilestone(activeCareerId, milestoneId, isCompleted);
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
