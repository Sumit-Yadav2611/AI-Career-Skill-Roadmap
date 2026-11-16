import api, { isMockMode } from './api';
import { mockCareers, mockRoadmapData, sampleParsedResume } from './mockData';
import { calculateSkillGap } from '../utils/helpers';
import { aiService, HIGH_DEMAND_MESSAGE } from './aiService';

export const careerService = {
  /**
   * Get career paths list (from backend if available, fallback to mockCareers).
   */
  async getCareers() {
    if (isMockMode) {
      await new Promise((res) => setTimeout(res, 150));
      return mockCareers;
    }

    try {
      const response = await api.get('/careers');
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data.map((c) => ({
          id: String(c.id),
          title: c.name || c.title,
          category: c.category,
          description: c.description,
          matchScore: c.matchScore || 85,
          requiredSkills: c.requiredSkills || [],
        }));
      }
      return mockCareers;
    } catch (err) {
      console.warn('Backend careers fetch failed, using fallback list:', err.message);
      return mockCareers;
    }
  },

  async getCareerById(careerId) {
    const all = await this.getCareers();
    const found = all.find((c) => String(c.id) === String(careerId) || c.title.toLowerCase() === String(careerId).toLowerCase());
    if (found) return found;
    return mockCareers[0];
  },

  /**
   * Skill Gap analysis using ONLY AI service.
   * If model is busy/overloaded, returns high demand message.
   */
  async getSkillGap(careerId, userSkills = []) {
    const career = await this.getCareerById(careerId);
    const skillNames = (userSkills || []).map((s) => (typeof s === 'string' ? s : s.name)).filter(Boolean);

    try {
      const aiRes = await aiService.analyzeSkills(career.title, skillNames);

      const acquired = (aiRes.skills_with_proficiency || []).map((s) => ({
        id: s.name,
        name: s.name,
        category: s.category || 'Technical',
        userLevel: s.proficiency || 'Intermediate',
        verified: true,
      }));

      const missing = (aiRes.missing_critical_skills || []).map((m) => ({
        id: m.skill || m.name,
        name: m.skill || m.name,
        category: 'Target Role Competency',
        importance: m.importance === 'CRITICAL' ? 'Critical' : 'Required',
        reason: m.reason || 'Core requirement for this technical role',
      }));

      return {
        careerId,
        percentage: typeof aiRes.overall_match_percentage === 'number' ? aiRes.overall_match_percentage : 75,
        totalRequired: acquired.length + missing.length,
        acquired: acquired.length > 0 ? acquired : skillNames.map((n) => ({ id: n, name: n, userLevel: 'Intermediate' })),
        missing: missing.length > 0 ? missing : [
          { id: 'm1', name: 'System Design', importance: 'Critical' },
          { id: 'm2', name: 'Cloud Deployment (Docker/AWS)', importance: 'Required' },
        ],
        strengthsSummary: aiRes.strengths_summary,
      };
    } catch (err) {
      console.warn('AI Skill analysis error / high demand:', err.message);
      // Fallback calculation using standard logic if AI model is in high demand, but display notice
      const fallback = calculateSkillGap(userSkills, career.requiredSkills || []);
      fallback.aiNotice = HIGH_DEMAND_MESSAGE;
      return fallback;
    }
  },

  /**
   * Roadmap generation using ONLY AI service.
   * If model is busy/overloaded, returns high demand message.
   */
  async getRoadmap(careerId, userId, userSkills = []) {
    const career = await this.getCareerById(careerId);
    const skillNames = (userSkills || []).map((s) => (typeof s === 'string' ? s : s.name)).filter(Boolean);

    try {
      const aiRes = await aiService.recommendRoadmap(
        career.title,
        skillNames,
        'Beginner',
        12
      );

      if (aiRes && aiRes.phases && aiRes.phases.length > 0) {
        return {
          careerId,
          careerTitle: aiRes.target_career || career.title,
          experienceLevel: aiRes.experience_level || 'Beginner',
          durationWeeks: aiRes.duration_weeks || 12,
          readinessScore: 82,
          phases: aiRes.phases.map((p, pIdx) => ({
            id: `p_${p.phase_number || pIdx + 1}`,
            title: p.phase_title || p.title || `Phase ${pIdx + 1}`,
            duration: p.duration || `Weeks ${pIdx * 3 + 1}-${(pIdx + 1) * 3}`,
            description: p.description || '',
            milestones: (p.milestones || []).map((m, mIdx) => ({
              id: `m_${p.phase_number || pIdx + 1}_${m.milestone_number || mIdx + 1}`,
              title: m.title || `Milestone ${mIdx + 1}`,
              description: m.description || m.practical_task || '',
              skills: m.skills || [],
              status: 'pending',
              resource: m.recommended_resources?.[0]
                ? {
                    title: m.recommended_resources[0],
                    link: `https://www.google.com/search?q=${encodeURIComponent(m.recommended_resources[0])}`,
                  }
                : {
                    title: 'Recommended Guide',
                    link: 'https://roadmap.sh',
                  },
            })),
          })),
        };
      }
    } catch (err) {
      console.warn('AI Roadmap generation error / high demand:', err.message);
      // If AI model is temporarily rate limited / high demand, throw error or notify
      throw new Error(HIGH_DEMAND_MESSAGE);
    }

    // Default template fallback if needed
    const template = mockRoadmapData[careerId] || mockRoadmapData['full-stack'];
    return JSON.parse(JSON.stringify(template));
  },

  async updateMilestone(careerId, milestoneId, isCompleted, userId) {
    const userScope = encodeURIComponent(userId || 'anonymous');
    const storageKey = `csrp_roadmap_${userScope}_${careerId}`;
    let roadmap = null;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        roadmap = JSON.parse(stored);
      }
    } catch {}

    if (!roadmap) {
      roadmap = await this.getRoadmap(careerId, userId);
    }

    const updatedPhases = (roadmap.phases || []).map((phase) => ({
      ...phase,
      milestones: (phase.milestones || []).map((m) => {
        if (m.id === milestoneId) {
          return { ...m, status: isCompleted ? 'completed' : 'pending' };
        }
        return m;
      }),
    }));

    const updatedRoadmap = { ...roadmap, phases: updatedPhases };
    localStorage.setItem(storageKey, JSON.stringify(updatedRoadmap));
    return updatedRoadmap;
  },

  async parseResume(file) {
    try {
      return await aiService.reviewResumeUpload(file);
    } catch (err) {
      console.warn('AI Resume review notice:', err.message);
      return {
        ...sampleParsedResume,
        fileName: file ? file.name : 'Uploaded_Resume.pdf',
        fileSize: file ? `${(file.size / 1024).toFixed(1)} KB` : '412 KB',
        notice: HIGH_DEMAND_MESSAGE,
      };
    }
  },
};

export default careerService;
