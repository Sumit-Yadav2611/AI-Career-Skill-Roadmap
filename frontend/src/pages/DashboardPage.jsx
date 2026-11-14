import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Award,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  FileText,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useRoadmap } from '../hooks/useRoadmap';
import { isMockMode } from '../services/api';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import SkillRadarChart from '../components/dashboard/SkillRadarChart';
import MilestoneBarChart from '../components/dashboard/MilestoneBarChart';
import CareerMatchCard from '../components/dashboard/CareerMatchCard';

const hasValue = (value) => value !== null && value !== undefined && String(value).trim() !== '';

const getProfileCompleteness = (user) => {
  const fields = ['name', 'email', 'college', 'degree', 'branch', 'semester', 'cgpa'];
  const completed = fields.filter((field) => hasValue(user?.[field])).length;
  return {
    completed,
    total: fields.length,
    percentage: Math.round((completed / fields.length) * 100)
  };
};

const getMilestoneStats = (roadmap) => {
  const milestones = (roadmap?.phases || []).flatMap((phase) => phase.milestones || []);
  const completed = milestones.filter((milestone) => milestone.status === 'completed').length;
  return {
    completed,
    total: milestones.length,
    percentage: milestones.length ? Math.round((completed / milestones.length) * 100) : null
  };
};

const getAssessmentStats = (history) => {
  const attempts = (Array.isArray(history) ? history : []).filter(
    (attempt) => attempt.score !== null && attempt.score !== undefined && attempt.score !== '' && Number.isFinite(Number(attempt.score))
  );
  if (!attempts.length) return { average: null, count: 0 };

  const average = Math.round(
    attempts.reduce((sum, attempt) => sum + Number(attempt.score), 0) / attempts.length
  );
  return { average, count: attempts.length };
};

const getSkillChartData = (career, userSkills) => {
  const requiredSkills = career?.requiredSkills || [];
  if (!requiredSkills.length) return [];

  const normalize = (value) => String(value || '').trim().toLowerCase();
  const skillByName = new Map(
    (userSkills || []).map((skill) => [
      normalize(typeof skill === 'string' ? skill : skill.name),
      typeof skill === 'string' ? { proficiency: null } : skill
    ])
  );
  const proficiencyScore = { beginner: 33, intermediate: 66, advanced: 100 };
  const groups = new Map();
  let hasAssessedMatch = false;

  requiredSkills.forEach((requiredSkill) => {
    const category = requiredSkill.category || 'Other';
    if (!groups.has(category)) groups.set(category, { subject: category, required: [], current: [] });
    const group = groups.get(category);
    const requiredLevel = proficiencyScore[normalize(requiredSkill.level)] || 66;
    group.required.push(requiredLevel);

    const listedSkill = skillByName.get(normalize(requiredSkill.name));
    if (listedSkill) {
      const currentLevel = proficiencyScore[normalize(listedSkill.proficiency)];
      if (currentLevel) {
        group.current.push(currentLevel);
        hasAssessedMatch = true;
      }
    }
  });

  if (!hasAssessedMatch) return [];

  return Array.from(groups.values()).map((group) => ({
    subject: group.subject,
    current: group.current.length
      ? Math.round(group.current.reduce((sum, value) => sum + value, 0) / group.current.length)
      : 0,
    required: Math.round(group.required.reduce((sum, value) => sum + value, 0) / group.required.length)
  }));
};

const getPhaseChartData = (roadmap) =>
  (roadmap?.phases || []).map((phase, index) => {
    const milestones = phase.milestones || [];
    return {
      phase: `P${index + 1}`,
      completed: milestones.filter((milestone) => milestone.status === 'completed').length,
      total: milestones.length
    };
  }).filter((phase) => phase.total > 0);

export const DashboardPage = () => {
  const { user } = useAuth();
  const { careers, activeCareer, roadmap, skillGap, loading, error, selectTargetCareer } = useRoadmap();

  const skills = user?.userSkills || [];
  const profile = getProfileCompleteness(user);
  const milestones = getMilestoneStats(roadmap);
  const assessments = getAssessmentStats(user?.assessmentHistory);
  const skillChartData = getSkillChartData(activeCareer, skills);
  const phaseChartData = getPhaseChartData(roadmap);
  const alternateCareers = careers.filter((career) => career.id !== activeCareer?.id);

  const nextStep = skills.length === 0
    ? {
        title: 'Add your current skills',
        description: 'Add skills you can demonstrate so the platform can compare your profile with your target role.',
        href: '/profile',
        action: 'Update Profile'
      }
    : assessments.count === 0
      ? {
          title: 'Take your first skill assessment',
          description: 'Complete an assessment to add evidence of your current knowledge to your profile.',
          href: '/assessment',
          action: 'Start Assessment'
        }
      : !activeCareer
        ? {
            title: 'Choose a target career',
            description: 'Select a career path to see its required skills and learning roadmap.',
            href: '/profile',
            action: 'Review Profile'
          }
        : {
            title: 'Review your skill gaps',
            description: 'Focus on the highest-priority skills that are still missing from your target role.',
            href: '/skill-gap',
            action: 'View Skill Gaps'
          };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-brand-950 text-white p-6 sm:p-8 rounded-3xl shadow-md">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            {isMockMode ? 'Development Preview' : 'Your Career Workspace'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Student'}!
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
            {[user?.degree, user?.college].filter(hasValue).join(' • ') || 'Complete your profile to personalize your career plan.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/assessment">
            <Button size="md" className="bg-white text-slate-900 hover:bg-slate-100 font-bold gap-2">
              <BrainCircuit className="w-4 h-4 text-brand-600" /> Take Assessment
            </Button>
          </Link>
          <Link to="/profile">
            <Button size="md" variant="ghost" className="text-white hover:bg-white/10 border border-white/20">
              <FileText className="w-4 h-4 mr-1.5" /> Update Profile
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">
          {error}
        </div>
      )}

      {isMockMode && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          You're viewing development demo data. Values and career examples on this screen are not live AI predictions or real student outcomes.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-brand-600">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Roadmap Progress</span>
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {milestones.percentage === null ? '—' : `${milestones.percentage}%`}
            </span>
            <span className="text-xs text-slate-500">
              {milestones.total ? `${milestones.completed} of ${milestones.total} tasks` : 'No roadmap tasks'}
            </span>
          </div>
          <div className="mt-3">
            <ProgressBar value={milestones.percentage ?? 0} size="sm" color="indigo" />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Profile Completeness</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{profile.percentage}%</span>
            <span className="text-xs text-slate-500">{profile.completed}/{profile.total} details</span>
          </div>
          <div className="mt-3">
            <ProgressBar value={profile.percentage} size="sm" color="emerald" />
          </div>
          <p className="mt-2 text-[11px] text-slate-500">{skills.length} self-reported skills listed</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Assessment Average</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {assessments.average === null ? '—' : `${assessments.average}%`}
            </span>
            <span className="text-xs text-slate-500">
              {assessments.count} {assessments.count === 1 ? 'attempt' : 'attempts'}
            </span>
          </div>
          <div className="mt-3">
            <ProgressBar value={assessments.average ?? 0} size="sm" color="purple" />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Skill Gaps</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {skills.length === 0 || !skillGap ? '—' : skillGap.missing.length}
            </span>
            <span className="text-xs text-rose-600 font-semibold">
              {skills.length === 0 ? 'Add skills first' : 'Missing requirements'}
            </span>
          </div>
          <div className="mt-3">
            <Link to="/skill-gap" className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1">
              Analyze Skill Gap <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </Card>
      </div>

      {activeCareer ? (
        <CareerMatchCard
          career={activeCareer}
          alternateCareers={alternateCareers}
          onSelectCareer={selectTargetCareer}
          isDemo={isMockMode}
        />
      ) : (
        <Card className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Choose your target career</h2>
            <p className="mt-1 text-sm text-slate-600">
              Select a role to see its required skills, compare your profile, and build a learning plan.
            </p>
          </div>
          <select
            aria-label="Choose target career"
            defaultValue=""
            onChange={(event) => event.target.value && selectTargetCareer(event.target.value)}
            className="w-full sm:max-w-xs rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800"
          >
            <option value="" disabled>Select a career</option>
            {careers.map((career) => (
              <option key={career.id} value={career.id}>{career.title}</option>
            ))}
          </select>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4 gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Profile Skills vs Role Requirements</h3>
              <p className="text-xs text-slate-500">
                Self-reported proficiency compared with the selected role's required levels
              </p>
            </div>
            <Badge variant="indigo" size="sm">Skill inventory</Badge>
          </div>
          <SkillRadarChart data={skillChartData} />
          <div className="flex flex-wrap items-center justify-center gap-5 mt-2 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-brand-500" />
              <span>Listed in your profile</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>Role requirement</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4 gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Milestones by Roadmap Phase</h3>
              <p className="text-xs text-slate-500">Completed tasks in each phase of your current roadmap</p>
            </div>
            <Badge variant="emerald" size="sm">Saved progress</Badge>
          </div>
          <MilestoneBarChart data={phaseChartData} />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 md:col-span-2">
          <div className="flex items-center justify-between mb-3 gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Skill Gaps{activeCareer ? ` for ${activeCareer.title}` : ''}
            </h4>
            <Link to="/skill-gap" className="text-xs font-bold text-brand-600 hover:underline">
              View Analysis <ArrowRight className="inline w-3 h-3" />
            </Link>
          </div>

          {skills.length === 0 ? (
            <p className="text-sm text-slate-500 py-4">
              Add your current skills in your profile to calculate a meaningful skill gap.
            </p>
          ) : (skillGap?.missing || []).length === 0 ? (
            <p className="text-sm text-emerald-700 py-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> No missing required skills were found in the current comparison.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {skillGap.missing.slice(0, 4).map((skill) => (
                <div key={skill.id || skill.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{skill.name}</p>
                    <span className="text-[10px] text-slate-500">{skill.category}</span>
                  </div>
                  <Badge variant={skill.importance === 'Critical' ? 'rose' : 'amber'} size="sm">
                    {skill.importance || 'Required'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-5 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 block mb-1">
              Suggested Next Step
            </span>
            <h4 className="text-sm font-bold text-slate-900 mb-2">{nextStep.title}</h4>
            <p className="text-xs text-slate-600">{nextStep.description}</p>
          </div>
          <Link to={nextStep.href} className="mt-4">
            <Button size="sm" className="w-full gap-1.5">
              {nextStep.action} <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </Card>
      </div>

      {loading && (
        <p className="text-xs text-slate-500 text-center">Refreshing career and roadmap data…</p>
      )}
    </div>
  );
};

export default DashboardPage;
