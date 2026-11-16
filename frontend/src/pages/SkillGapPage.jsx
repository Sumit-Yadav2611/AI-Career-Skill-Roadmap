import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  GitFork,
  Sparkles,
  RefreshCw,
  Cpu,
} from 'lucide-react';
import { useRoadmap } from '../hooks/useRoadmap';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';

export const SkillGapPage = () => {
  const {
    careers,
    activeCareer,
    activeCareerId,
    selectTargetCareer,
    skillGap,
    loading,
    error,
  } = useRoadmap();
  const { user } = useAuth();

  const acquiredSkills = skillGap?.acquired || [];
  const missingSkills = skillGap?.missing || [];
  const totalRequired = skillGap?.totalRequired ?? (acquiredSkills.length + missingSkills.length);
  const matchPercentage = typeof skillGap?.percentage === 'number' ? skillGap.percentage : 78;

  const isHighDemand =
    error && (error.toLowerCase().includes('demand') || error.toLowerCase().includes('busy'));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E202B] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-red-950/80 border border-red-800/60 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]">
              <GitFork className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-red-500">
              AI Skill Gap Engine
            </span>
            <Badge variant="rose" size="sm">Gemini Powered</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            AI Semantic Skill Gap Analysis
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Purely synthesized using AI microservice APIs. Compares your skills against target job profiles.
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex items-center gap-3 bg-[#12131A] p-2.5 rounded-2xl border border-[#222432]">
          <label htmlFor="target-career" className="text-xs font-semibold text-slate-400 pl-2">
            Target Role:
          </label>
          <select
            id="target-career"
            value={activeCareerId || ''}
            onChange={(e) => selectTargetCareer(e.target.value)}
            className="rounded-xl border border-[#2B2C3C] bg-[#181924] px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-red-600 cursor-pointer"
          >
            {careers.map((career) => (
              <option key={career.id} value={career.id} className="bg-[#12131A] text-white">
                {career.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* High Demand / Error Notice */}
      {error && (
        <div className="rounded-2xl border border-red-800/80 bg-red-950/60 p-4 text-xs text-red-300 flex items-center justify-between gap-3 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <div>
              <p className="font-bold text-white">
                {isHighDemand ? 'Model is in high demand, try later' : error}
              </p>
              <p className="text-[11px] text-red-300 mt-0.5">
                AI skill analysis microservice is processing high request load.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => selectTargetCareer(activeCareerId)}
            className="bg-red-600 hover:bg-red-500 text-white font-bold rounded-full px-4 py-1.5 text-xs shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Retry AI
          </Button>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="p-5 bg-[#12131A] border-l-4 border-l-red-600 border border-[#222432] rounded-2xl relative overflow-hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            AI Skill Match
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{matchPercentage}%</span>
            <Badge variant="rose" size="sm">
              {matchPercentage >= 70 ? 'High Coverage' : 'Gaps Detected'}
            </Badge>
          </div>
          <div className="mt-3">
            <ProgressBar value={matchPercentage} size="sm" color="rose" />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            AI match score for {activeCareer?.title || 'Target Role'}
          </p>
        </Card>

        <Card className="p-5 bg-[#12131A] border-l-4 border-l-emerald-500 border border-[#222432] rounded-2xl relative overflow-hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Skills Verified in Profile
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-400">{acquiredSkills.length}</span>
            <span className="text-xs text-slate-500">of {totalRequired}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-4">
            Matching technical keywords identified by AI
          </p>
        </Card>

        <Card className="p-5 bg-[#12131A] border-l-4 border-l-red-500 border border-[#222432] rounded-2xl relative overflow-hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            High-Priority Gaps
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-red-500">{missingSkills.length}</span>
            <span className="text-xs text-red-400 font-semibold">critical skills</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-4">
            Target topics prioritized in your learning roadmap
          </p>
        </Card>
      </div>

      {/* 2-Column Lists: Acquired vs Missing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Acquired Skills Card */}
        <Card className="p-6 bg-[#12131A] border border-[#222432] rounded-2xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E202B]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h3 className="text-sm font-bold text-white">
                Skills Verified ({acquiredSkills.length})
              </h3>
            </div>
            <Badge variant="emerald" size="sm">Profile Verified</Badge>
          </div>

          <div className="space-y-2.5">
            {acquiredSkills.map((skill, idx) => (
              <div
                key={skill.id || idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#161722] border border-[#252738] text-xs"
              >
                <div>
                  <span className="font-bold text-white">{skill.name}</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">
                    {skill.category || 'Core Skill'} • Verified Competency
                  </span>
                </div>
                <Badge variant="emerald" size="sm">
                  {skill.userLevel || 'Intermediate'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Missing Skills Card */}
        <Card className="p-6 bg-[#12131A] border border-[#222432] rounded-2xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E202B]">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <h3 className="text-sm font-bold text-white">
                Skills to Develop ({missingSkills.length})
              </h3>
            </div>
            <Badge variant="rose" size="sm">Actionable Gaps</Badge>
          </div>

          <div className="space-y-2.5">
            {missingSkills.map((skill, idx) => (
              <div
                key={skill.id || idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#161722] border border-[#252738] text-xs"
              >
                <div>
                  <span className="font-bold text-white">{skill.name}</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">
                    {skill.reason || 'Essential industry requirement for target role'}
                  </span>
                </div>
                <Badge
                  variant={skill.importance === 'Critical' ? 'rose' : 'amber'}
                  size="sm"
                >
                  {skill.importance || 'Priority'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* CTA Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-red-600/30">
        <div>
          <h3 className="text-xl font-black">Ready to Bridge Your Skill Gaps?</h3>
          <p className="text-xs text-red-100 mt-1 max-w-lg">
            Your personalized multi-phase AI roadmap breaks down these missing competencies into weekly milestones and hands-on capstone tasks.
          </p>
        </div>
        <Link to="/roadmap">
          <Button
            size="lg"
            className="bg-white text-red-700 hover:bg-slate-100 font-bold rounded-full px-6 py-3 shadow-lg shrink-0 gap-2"
          >
            Open Learning Roadmap <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SkillGapPage;
