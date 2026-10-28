/**
 * Utility functions for AI Career & Skill Roadmap Platform
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
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function calculateSkillGap(userSkills, careerRequiredSkills) {
  const normalizedUser = (userSkills || []).map(s => 
    (typeof s === 'string' ? s : s.name).toLowerCase().trim()
  );

  const acquired = [];
  const missing = [];

  careerRequiredSkills.forEach(reqSkill => {
    const isPresent = normalizedUser.includes(reqSkill.name.toLowerCase().trim());
    if (isPresent) {
      acquired.push(reqSkill);
    } else {
      missing.push(reqSkill);
    }
  });

  const percentage = careerRequiredSkills.length > 0 
    ? Math.round((acquired.length / careerRequiredSkills.length) * 100) 
    : 0;

  return {
    acquired,
    missing,
    percentage,
    totalRequired: careerRequiredSkills.length
  };
}
