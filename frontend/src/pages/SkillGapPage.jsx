import React from 'react';
import { Link } from 'react-router-dom';
import {
  GitFork,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Layers,
  BookOpen,
  Filter
} from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';

export const SkillGapPage = () => {
  const { careers, activeCareer, activeCareerId, selectTargetCareer, skillGap } = useRoadmap();
  const { user } = useAuth();

  const acquiredSkills = skillGap?.acquired || [];
  const missingSkills = skillGap?.missing || [];
  const totalRequired = skillGap?.totalRequired || 10;
  const matchPercentage = skillGap?.percentage || 70;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header & Target Role Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <Badge variant="indigo" size="sm" className="mb-1.5">
            Skill Gap Engine
          </Badge>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Skill Gap Analysis
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify acquired vs missing skills required for your target engineering career.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 pl-2">Target Role:</span>
          <select
            value={activeCareerId}
            onChange={(e) => selectTargetCareer(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            {careers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Match Percentage */}
        <Card className="p-5 border-l-4 border-l-brand-600">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Skill Compatibility
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{matchPercentage}%</span>
            <Badge variant={matchPercentage >= 70 ? 'emerald' : 'amber'} size="sm">
              {matchPercentage >= 70 ? 'High Fit' : 'Moderate Fit'}
            </Badge>
          </div>
          <div className="mt-3">
            <ProgressBar value={matchPercentage} size="sm" color="indigo" />
          </div>
        </Card>

        {/* Acquired Skills */}
        <Card className="p-5 border-l-4 border-l-emerald-500">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Acquired Skills
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600">
              {acquiredSkills.length}
            </span>
            <span className="text-xs text-slate-500">of {totalRequired} skills</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Verified in resume or assessments
          </p>
        </Card>

        {/* Missing Skills */}
        <Card className="p-5 border-l-4 border-l-rose-500">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Skill Gaps Identified
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-rose-600">
              {missingSkills.length}
            </span>
            <span className="text-xs text-rose-600 font-semibold">Critical Gaps</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Mapped into personalized roadmap
          </p>
        </Card>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Acquired Skills */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Acquired Skills ({acquiredSkills.length})
              </h3>
            </div>
            <Badge variant="emerald" size="sm">
              Ready
            </Badge>
          </div>

          <p className="text-xs text-slate-500 mb-4">
            These skills match the industry standards required for {activeCareer?.title}.
          </p>

          <div className="space-y-2.5">
            {acquiredSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/40 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900">{skill.name}</span>
                  <span className="block text-[11px] text-slate-500 mt-0.5">
                    Category: {skill.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="emerald" size="sm">
                    {skill.level || 'Intermediate'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: Missing Skills Gap */}
        <Card className="p-6 border-rose-100">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Identified Skill Gaps ({missingSkills.length})
              </h3>
            </div>
            <Badge variant="rose" size="sm">
              Action Needed
            </Badge>
          </div>

          <p className="text-xs text-slate-500 mb-4">
            Prioritize acquiring these skills to boost placement readiness for {activeCareer?.title}.
          </p>

          <div className="space-y-2.5">
            {missingSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-rose-100 bg-rose-50/40 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900">{skill.name}</span>
                  <span className="block text-[11px] text-slate-500 mt-0.5">
                    Category: {skill.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={skill.importance === 'Critical' ? 'rose' : 'amber'} size="sm">
                    {skill.importance} Priority
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Callout Banner to Roadmap */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div>
          <h3 className="text-lg font-bold">
            Close Your Skill Gap with a Step-by-Step Roadmap
          </h3>
          <p className="text-xs text-brand-100 mt-1">
            Follow customized weekly milestones with curated courses, documentation, and projects.
          </p>
        </div>

        <Link to="/roadmap">
          <Button size="md" className="bg-white text-brand-700 hover:bg-slate-100 font-bold gap-2 shrink-0">
            View Learning Roadmap <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default SkillGapPage;
