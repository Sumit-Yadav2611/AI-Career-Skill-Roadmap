import axios from 'axios';

export const AI_API_URL =
  import.meta.env.VITE_AI_API_URL || 'https://careerroadmap-1.onrender.com';

export const HIGH_DEMAND_MESSAGE = 'Model is in high demand, try later';

export const aiService = {
  getBaseUrl() {
    return (AI_API_URL || 'https://careerroadmap-1.onrender.com').replace(/\/+$/, '');
  },

  /**
   * Called immediately on user login.
   * Wakes up the AI service and stores the health/readiness response in localStorage.
   */
  async pingAiService() {
    const url = `${this.getBaseUrl()}/`;
    try {
      const response = await axios.get(url, {
        timeout: 15000,
        headers: { Accept: 'application/json' },
      });
      localStorage.setItem('csrp_ai_service_response', JSON.stringify(response.data));
      localStorage.setItem('csrp_ai_status', 'ONLINE');
      return { success: true, data: response.data };
    } catch (error) {
      console.warn('AI Service wake-up / health check notice:', error.message);
      const payload = {
        status: 'HIGH_DEMAND',
        message: HIGH_DEMAND_MESSAGE,
        error: error.message,
      };
      localStorage.setItem('csrp_ai_service_response', JSON.stringify(payload));
      localStorage.setItem('csrp_ai_status', 'HIGH_DEMAND');
      return { success: false, message: HIGH_DEMAND_MESSAGE };
    }
  },

  /**
   * Generate an AI-powered learning roadmap using only the AI service.
   */
  async recommendRoadmap(targetCareer, currentSkills = [], experienceLevel = 'Beginner', durationWeeks = 12) {
    const url = `${this.getBaseUrl()}/roadmap-recommendation`;
    try {
      const response = await axios.post(
        url,
        {
          target_career: targetCareer,
          current_skills: currentSkills,
          experience_level: experienceLevel || 'Beginner',
          duration_weeks: durationWeeks || 12,
        },
        {
          timeout: 45000,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return response.data;
    } catch (error) {
      console.error('AI Roadmap generation error:', error);
      throw new Error(HIGH_DEMAND_MESSAGE);
    }
  },

  /**
   * Run semantic skill gap analysis using only the AI service.
   */
  async analyzeSkills(targetCareer, skills = [], text = '') {
    const url = `${this.getBaseUrl()}/skill-analysis`;
    try {
      const payload = {
        target_career: targetCareer,
      };
      if (skills && skills.length > 0) {
        payload.skills = skills;
      }
      if (text && text.trim().length > 0) {
        payload.text = text.trim();
      }
      if (!payload.skills && !payload.text) {
        payload.skills = ['General Problem Solving'];
      }

      const response = await axios.post(url, payload, {
        timeout: 35000,
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('AI Skill Analysis error:', error);
      throw new Error(HIGH_DEMAND_MESSAGE);
    }
  },

  /**
   * Upload and review a resume PDF using the AI service.
   */
  async reviewResumeUpload(file, targetCareer = '') {
    const url = `${this.getBaseUrl()}/resume-review/upload`;
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (targetCareer) {
        formData.append('target_career', targetCareer);
      }

      const response = await axios.post(url, formData, {
        timeout: 60000,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('AI Resume Review error:', error);
      throw new Error(HIGH_DEMAND_MESSAGE);
    }
  },
};

export default aiService;
