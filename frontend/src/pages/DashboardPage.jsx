import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  FileText,
  UserCheck,
  Clock,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRoadmap } from '../context/RoadmapContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import SkillRadarChart from '../components/dashboard/SkillRadarChart';
import MilestoneBarChart from '../components/dashboard/MilestoneBarChart';
import CareerMatchCard from '../components/dashboard/CareerMatchCard';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { careers, activeCareer, roadmap, skillGap, selectTargetCareer } = useRoadmap();

  const readinessScore = roadmap?.readinessScore || user?.careerReadiness || 72;
  const alternateCareers = careers.filter((c) => c.id !== activeCareer?.id);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-brand-950 text-white p-6 sm:p-8 rounded-3xl shadow-md">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Roadmap Active
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Student'}! 👋
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
            {user?.degree} • {user?.college}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/assessment">
            <Button size="md" className="bg-white text-slate-900 hover:bg-slate-100 font-bold gap-2">
              <BrainCircuit className="w-4 h-4 text-brand-600" /> Take Assessment
            </Button>
          </Link>
          <Link to="/profile">
            <Button size="md" variant="ghost" className="text-white hover:bg-white/10 border border-white/20">
              <FileText className="w-4 h-4 mr-1.5" /> Upload Resume
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Career Readiness */}
        <Card className="p-5 border-l-4 border-l-brand-600">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Career Readiness
            </span>
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {readinessScore}%
            </span>
            <Badge variant="emerald" size="sm">
              +12% this month
            </Badge>
          </div>
          <div className="mt-3">
            <ProgressBar value={readinessScore} size="sm" color="indigo" />
          </div>
        </Card>

        {/* Profile & Resume Completeness */}
        <Card className="p-5 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Profile & Resume
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {user?.profileScore || 85}%
            </span>
            <span className="text-xs text-slate-500">9 Skills Synced</span>
          </div>
          <div className="mt-3">
            <ProgressBar value={user?.profileScore || 85} size="sm" color="emerald" />
          </div>
        </Card>

        {/* Assessment Score Average */}
        <Card className="p-5 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Quiz Average
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">80%</span>
            <Badge variant="purple" size="sm">
              2 Quizzes Taken
            </Badge>
          </div>
          <div className="mt-3">
            <ProgressBar value={80} size="sm" color="purple" />
          </div>
        </Card>

        {/* Skill Gap Count */}
        <Card className="p-5 border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Skill Gaps
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {skillGap?.missing?.length || 3}
            </span>
            <span className="text-xs text-rose-600 font-semibold">Missing Skills</span>
          </div>
          <div className="mt-3">
            <Link
              to="/skill-gap"
              className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
            >
              Analyze Skill Gap &rarr;
            </Link>
          </div>
        </Card>
      </div>

      {/* Top ML Career Match Card */}
      <CareerMatchCard
        career={activeCareer}
        alternateCareers={alternateCareers}
        onSelectCareer={selectTargetCareer}
      />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart: Skill Domain Balance */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Skill Competency vs Industry Target
              </h3>
              <p className="text-xs text-slate-500">
                AI evaluation benchmarked across engineering disciplines
              </p>
            </div>
            <Badge variant="indigo" size="sm">
              Multi-Domain
            </Badge>
          </div>
          <SkillRadarChart />
          <div className="flex items-center justify-center gap-6 mt-2 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-brand-500" />
              <span>Your Assessed Level</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>Industry Benchmark</span>
            </div>
          </div>
        </Card>

        {/* Bar Chart: Learning Streak */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Roadmap Milestones Completed
              </h3>
              <p className="text-xs text-slate-500">
                Weekly velocity of finished roadmap topics
              </p>
            </div>
            <Badge variant="emerald" size="sm">
              Active Streak 🔥
            </Badge>
          </div>
          <MilestoneBarChart />
          <div className="mt-2 text-center text-xs text-slate-500">
            Average velocity: <span className="font-bold text-slate-800">4.1 topics / week</span>
          </div>
        </Card>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Missing Skills Preview */}
        <Card className="p-5 md:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Immediate Skill Gaps for {activeCareer?.title}
            </h4>
            <Link to="/skill-gap" className="text-xs font-bold text-brand-600 hover:underline">
              View Matrix &rarr;
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {(skillGap?.missing || []).slice(0, 4).map((skill) => (
              <div
                key={skill.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900">{skill.name}</p>
                  <span className="text-[10px] text-slate-500">{skill.category}</span>
                </div>
                <Badge variant={skill.importance === 'Critical' ? 'rose' : 'amber'} size="sm">
                  {skill.importance}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Assessment Recommendations */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 block mb-1">
              Next Recommended Step
            </span>
            <h4 className="text-sm font-bold text-slate-900 mb-2">
              Attempt Machine Learning Quiz
            </h4>
            <p className="text-xs text-slate-600">
              Calibrate your ML knowledge to unlock higher prediction scores for AI roles.
            </p>
          </div>
          <Link to="/assessment" className="mt-4">
            <Button size="sm" className="w-full gap-1.5">
              Launch Quiz (5 Mins) <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};
export default DashboardPage;
