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
      const career = mockCareers.find((item) => item.id === careerId);
      if (!career) throw new Error(`Career "${careerId}" was not found.`);
      return career;
    }
    const response = await api.get(`/careers/${careerId}`);
    return response.data;
  },

  async getSkillGap(careerId, userSkills) {
    const career = await this.getCareerById(careerId);
    return calculateSkillGap(userSkills, career.requiredSkills);
  },

  async getRoadmap(careerId, userId) {
    if (isMockMode) {
      // Local demo progress is scoped to one account and one target career.
      const userScope = encodeURIComponent(userId || 'anonymous');
      const storageKey = `csrp_roadmap_${userScope}_${careerId}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored);
      }

      const template = mockRoadmapData[careerId];
      if (!template) throw new Error(`No roadmap is available for career "${careerId}".`);
      const roadmap = JSON.parse(JSON.stringify(template));

      // Only the explicitly selected sample account starts with sample progress.
      // Newly registered students always begin with an empty checklist.
      if (userId !== 'usr_001') {
        roadmap.phases.forEach((phase) => {
          phase.milestones.forEach((milestone) => {
            milestone.status = 'pending';
          });
        });
      }

      return roadmap;
    }
    const response = await api.get(`/roadmap/${careerId}`);
    return response.data;
  },

  async updateMilestone(careerId, milestoneId, isCompleted, userId) {
    if (isMockMode) {
      const roadmap = await this.getRoadmap(careerId, userId);

      const updatedPhases = roadmap.phases.map((phase) => ({
        ...phase,
        milestones: phase.milestones.map((m) => {
          if (m.id === milestoneId) {
            const nextStatus = isCompleted ? 'completed' : 'pending';
            return { ...m, status: nextStatus };
          }
          return m;
        })
      }));

      const updatedRoadmap = {
        ...roadmap,
        phases: updatedPhases
      };

      const userScope = encodeURIComponent(userId || 'anonymous');
      localStorage.setItem(`csrp_roadmap_${userScope}_${careerId}`, JSON.stringify(updatedRoadmap));
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
        isDemoData: true,
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
