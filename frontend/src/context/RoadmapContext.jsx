import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { careerService } from '../services/careerService';
import { useAuth } from './AuthContext';

const RoadmapContext = createContext(null);

export const RoadmapProvider = ({ children }) => {
  const { user, updateUserProfile } = useAuth();
  const [careers, setCareers] = useState([]);
  const [activeCareerId, setActiveCareerId] = useState('full-stack');
  const [activeCareer, setActiveCareer] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [skillGap, setSkillGap] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load careers
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const data = await careerService.getCareers();
        setCareers(data);
        if (user?.targetCareerId) {
          setActiveCareerId(user.targetCareerId);
        }
      } catch (err) {
        console.error('Failed to fetch careers', err);
      }
    };
    fetchCareers();
  }, [user?.targetCareerId]);

  // Update active career and load roadmap & skill gap
  useEffect(() => {
    const loadCareerDetails = async () => {
      if (!activeCareerId) return;
      setLoading(true);
      try {
        const career = await careerService.getCareerById(activeCareerId);
        setActiveCareer(career);

        const rm = await careerService.getRoadmap(activeCareerId);
        setRoadmap(rm);

        if (user?.userSkills) {
          const gap = await careerService.getSkillGap(activeCareerId, user.userSkills);
          setSkillGap(gap);
        }
      } catch (err) {
        console.error('Error loading roadmap/skill gap', err);
      } finally {
        setLoading(false);
      }
    };

    loadCareerDetails();
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

      // Update user career readiness in profile
      if (updated.readinessScore && user) {
        await updateUserProfile({ careerReadiness: updated.readinessScore });
      }
    } catch (err) {
      console.error('Failed to update milestone', err);
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
