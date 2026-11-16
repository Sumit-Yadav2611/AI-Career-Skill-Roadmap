import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { careerService } from '../services/careerService';
import { useAuth } from '../hooks/useAuth';
import RoadmapContext from './roadmap-context';

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

  // Load available careers
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
        const list = Array.isArray(data) ? data : [];
        setCareers(list);
        if (user?.targetCareerId) {
          setActiveCareerId(user.targetCareerId);
        } else if (list.length > 0) {
          setActiveCareerId(list[0].id);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to fetch careers', err);
          setError(err?.message || 'Unable to load career options.');
        }
      }
    };

    fetchCareers();
    return () => {
      cancelled = true;
    };
  }, [userIdentity, user?.targetCareerId]);

  // Load role data and AI-based roadmap & skill gap
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
          careerService.getRoadmap(activeCareerId, userIdentity, user?.userSkills || []),
          careerService.getSkillGap(activeCareerId, user?.userSkills || []),
        ]);

        if (cancelled) return;
        setActiveCareer(career);
        setRoadmap(rm);
        setSkillGap(gap);
      } catch (err) {
        if (!cancelled) {
          console.error('Error loading roadmap / skill gap:', err);
          setError(err?.message || 'Model is in high demand, try later');
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
    const selectedCareer = careers.find((career) => String(career.id) === String(careerId));
    if (!selectedCareer) {
      setError('Please select an available career option.');
      return false;
    }

    try {
      if (user) {
        await updateUserProfile({ targetCareerId: careerId });
      }
      setActiveCareerId(careerId);
      setError('');
      return true;
    } catch (err) {
      setError(err?.message || 'Unable to save your target career.');
      return false;
    }
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
          colors: ['#ef4444', '#dc2626', '#b91c1c'],
        });
      }
    } catch (err) {
      console.error('Failed to update milestone', err);
      setError(err?.message || 'Unable to update this milestone.');
      return false;
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
        toggleMilestone,
      }}
    >
      {children}
    </RoadmapContext.Provider>
  );
};

export default RoadmapProvider;
