/**
 * Utility functions for the AI Career & Skill Roadmap Platform.
 */

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function getReadinessColor(score) {
  if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (score >= 50) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-rose-600 bg-rose-50 border-rose-200';
}

export function getReadinessBadge(score) {
  if (score >= 80) return { label: 'High Readiness', color: 'emerald' };
  if (score >= 50) return { label: 'Moderate Readiness', color: 'amber' };
  return { label: 'Action Required', color: 'rose' };
}

export function formatTime(seconds) {
  const safeSeconds = Math.max(0, Number.isFinite(Number(seconds)) ? Number(seconds) : 0);
  const mins = Math.floor(safeSeconds / 60);
  const secs = Math.floor(safeSeconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const normalizeSkillName = (skill) => {
  const name = typeof skill === 'string' ? skill : skill?.name;
  return typeof name === 'string' ? name.trim().toLowerCase() : '';
};

export function calculateSkillGap(userSkills, careerRequiredSkills) {
  const skillByName = new Map();

  (Array.isArray(userSkills) ? userSkills : []).forEach((skill) => {
    const normalizedName = normalizeSkillName(skill);
    if (normalizedName) skillByName.set(normalizedName, skill);
  });

  const requiredSkills = (Array.isArray(careerRequiredSkills) ? careerRequiredSkills : [])
    .filter((requiredSkill) => normalizeSkillName(requiredSkill));

  const acquired = [];
  const missing = [];

  requiredSkills.forEach((requiredSkill) => {
    const normalizedName = normalizeSkillName(requiredSkill);
    const userSkill = skillByName.get(normalizedName);

    if (userSkill) {
      acquired.push({
        ...requiredSkill,
        // Keep the target's required level separate from the student's own
        // self-reported/assessed proficiency.
        userLevel: typeof userSkill === 'string' ? null : userSkill.proficiency || null,
        source: typeof userSkill === 'string' ? 'self-reported' : userSkill.source || 'self-reported',
        verified: typeof userSkill === 'string' ? false : userSkill.verified === true
      });
    } else {
      missing.push(requiredSkill);
    }
  });

  const percentage = requiredSkills.length > 0
    ? Math.round((acquired.length / requiredSkills.length) * 100)
    : null;

  return {
    acquired,
    missing,
    percentage,
    totalRequired: requiredSkills.length
  };
}
