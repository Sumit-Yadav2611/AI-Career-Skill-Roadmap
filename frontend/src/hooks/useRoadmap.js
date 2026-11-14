import { useContext } from 'react';
import RoadmapContext from '../context/roadmap-context';

export const useRoadmap = () => {
  const context = useContext(RoadmapContext);
  if (!context) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
};

export default useRoadmap;
