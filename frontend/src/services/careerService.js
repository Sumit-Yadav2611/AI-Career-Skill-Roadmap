import api, { isMockMode } from './api';
import { mockCareers, mockRoadmapData, sampleParsedResume } from './mockData';
import { calculateSkillGap } from '../utils/helpers';

export const careerService = {
  async getCareers() {
    if (isMockMode) {
      await new Promise((res) => setTimeout(res, 200));
      return mockCareers;
    }
    const response = await api.get('/careers');
    return response.data;
  },

  async getCareerById(careerId) {
    if (isMockMode) {
      const career = mockCareers.find((c) => c.id === careerId) || mockCareers[0];
      return career;
    }
    const response = await api.get(`/careers/${careerId}`);
    return response.data;
  },

  async getSkillGap(careerId, userSkills) {
    const career = await this.getCareerById(careerId);
    return calculateSkillGap(userSkills, career.requiredSkills);
  },

  async getRoadmap(careerId) {
    if (isMockMode) {
      // Check if user has saved modified roadmap in local storage
      const stored = localStorage.getItem(`csrp_roadmap_${careerId}`);
      if (stored) {
        return JSON.parse(stored);
      }
      return mockRoadmapData[careerId] || mockRoadmapData['full-stack'];
    }
    const response = await api.get(`/roadmap/${careerId}`);
    return response.data;
  },

  async updateMilestone(careerId, milestoneId, isCompleted) {
    if (isMockMode) {
      const roadmap = await this.getRoadmap(careerId);
      let totalMilestones = 0;
      let completedMilestones = 0;

      const updatedPhases = roadmap.phases.map((phase) => ({
        ...phase,
        milestones: phase.milestones.map((m) => {
          totalMilestones++;
          if (m.id === milestoneId) {
            const nextStatus = isCompleted ? 'completed' : 'pending';
            if (nextStatus === 'completed') completedMilestones++;
            return { ...m, status: nextStatus };
          }
          if (m.status === 'completed') completedMilestones++;
          return m;
        })
      }));

      const newReadiness = Math.round((completedMilestones / totalMilestones) * 100);
      const updatedRoadmap = {
        ...roadmap,
        phases: updatedPhases,
        readinessScore: Math.max(newReadiness, 40)
      };

      localStorage.setItem(`csrp_roadmap_${careerId}`, JSON.stringify(updatedRoadmap));
      return updatedRoadmap;
    }

    const response = await api.patch(`/roadmap/${careerId}/milestones/${milestoneId}`, { isCompleted });
    return response.data;
  },

  async parseResume(file) {
    if (isMockMode) {
      await new Promise((res) => setTimeout(res, 1400)); // realistic parsing delay
      return {
        ...sampleParsedResume,
        fileName: file ? file.name : 'Uploaded_Resume.pdf',
        fileSize: file ? `${(file.size / 1024).toFixed(1)} KB` : '412 KB'
      };
    }

    const formData = new FormData();
    formData.append('resume', file);
    const response = await api.post('/resume/parse', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};
