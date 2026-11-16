import api, { isMockMode } from './api';
import { sampleParsedResume } from './mockData';

export const resumeService = {
  /**
   * Fetch all resumes belonging to the logged-in user from backend.
   */
  async getMyResumes() {
    if (isMockMode) {
      const stored = localStorage.getItem('csrp_mock_resume');
      return stored ? [JSON.parse(stored)] : [];
    }

    try {
      const response = await api.get('/resumes');
      return Array.isArray(response.data) ? response.data : [];
    } catch (err) {
      console.warn('Unable to fetch resumes from backend:', err.message);
      // Fallback to local stored resume if backend is temporarily unreachable
      const stored = localStorage.getItem('csrp_latest_resume');
      return stored ? [JSON.parse(stored)] : [];
    }
  },

  /**
   * Upload a new resume to backend.
   */
  async uploadResume(file) {
    if (isMockMode) {
      await new Promise((res) => setTimeout(res, 800));
      const mockResume = {
        id: Date.now(),
        originalFileName: file.name,
        contentType: 'application/pdf',
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
        storedFileName: 'https://example.com/mock-resume.pdf',
      };
      localStorage.setItem('csrp_mock_resume', JSON.stringify(mockResume));
      return mockResume;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/resumes/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.data) {
      localStorage.setItem('csrp_latest_resume', JSON.stringify(response.data));
    }
    return response.data;
  },

  /**
   * Update the latest resume in backend.
   */
  async updateLatestResume(file) {
    if (isMockMode) {
      await new Promise((res) => setTimeout(res, 800));
      const mockResume = {
        id: Date.now(),
        originalFileName: file.name,
        contentType: 'application/pdf',
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
        storedFileName: 'https://example.com/mock-resume-updated.pdf',
      };
      localStorage.setItem('csrp_mock_resume', JSON.stringify(mockResume));
      return mockResume;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await api.put('/resumes/latest/update', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.data) {
      localStorage.setItem('csrp_latest_resume', JSON.stringify(response.data));
    }
    return response.data;
  },

  /**
   * Trigger backend AI analysis for an uploaded resume.
   */
  async analyzeResume(resumeId) {
    if (isMockMode) {
      return sampleParsedResume;
    }
    const response = await api.post(`/resumes/${resumeId}/analyze`);
    return response.data;
  },
};

export default resumeService;
