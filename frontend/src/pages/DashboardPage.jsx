import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  GitFork,
  BrainCircuit,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  Compass,
  Cpu,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useRoadmap } from '../hooks/useRoadmap';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { activeCareer, roadmap, skillGap, careers, selectTargetCareer, loading } = useRoadmap();

  const acquiredSkills = skillGap?.acquired || [];
  const missingSkills = skillGap?.missing || [];
  const readinessScore = roadmap?.readinessScore || user?.careerReadiness || 78;
  const matchPercentage = skillGap?.percentage ?? activeCareer?.matchScore ?? 85;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-7">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#161724] via-[#12131A] to-[#250F16] border border-[#26283A] p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-red-950/80 border border-red-800/60 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                AI Career Intelligence
              </span>
              <Badge variant="rose" size="sm" className="bg-red-950/70 text-red-400 border-red-800/50">
                Gemini Active
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome back, {user?.name || user?.fullName || 'Student'}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Target role: <strong className="text-white">{activeCareer?.title || 'Full-Stack Web Developer'}</strong>. Keep tracking your milestones and practicing timed evaluations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/roadmap">
              <Button
                size="md"
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-full px-6 py-2.5 shadow-lg shadow-red-600/35 gap-2"
              >
                <MapPin className="w-4 h-4" /> View AI Roadmap
              </Button>
            </Link>
            <Link to="/profile">
              <Button
                size="md"
                variant="secondary"
                className="bg-[#181924] text-slate-200 border border-[#2C2D3E] hover:bg-[#202230] hover:text-white rounded-full px-5 py-2.5 text-xs font-semibold gap-2"
              >
                <FileText className="w-4 h-4 text-red-500" /> Resume Matrix
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="p-5 bg-[#12131A] border border-[#222432] rounded-2xl relative overflow-hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Career Readiness
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{readinessScore}%</span>
            <Badge variant="rose" size="sm">Benchmark</Badge>
          </div>
          <div className="mt-3">
            <ProgressBar value={readinessScore} size="sm" color="rose" />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Evaluated against industry competency levels
          </p>
        </Card>

        <Card className="p-5 bg-[#12131A] border border-[#222432] rounded-2xl relative overflow-hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Target Role Match
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-red-500">{matchPercentage}%</span>
            <Badge variant="rose" size="sm">Semantic Match</Badge>
          </div>
          <div className="mt-3">
            <ProgressBar value={matchPercentage} size="sm" color="rose" />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            {activeCareer?.title || 'Full-Stack Developer'}
          </p>
        </Card>

        <Card className="p-5 bg-[#12131A] border border-[#222432] rounded-2xl relative overflow-hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Skills Verified
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-400">
              {acquiredSkills.length || (user?.userSkills?.length || 16)}
            </span>
            <span className="text-xs text-slate-500">profile skills</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-4">
            Extracted from resume & self-attested
          </p>
        </Card>

        <Card className="p-5 bg-[#12131A] border border-[#222432] rounded-2xl relative overflow-hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Skill Gaps Identified
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-red-400">
              {missingSkills.length || 3}
            </span>
            <span className="text-xs text-slate-500">to acquire</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-4">
            Covered in your personalized AI roadmap
          </p>
        </Card>
      </div>

      {/* Main Grid: Roadmap Progress & Skill Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: AI Roadmap Next Milestones */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-[#12131A] border border-[#222432] rounded-2xl">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#1E202B]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-800/60 flex items-center justify-center text-red-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Personalized AI Roadmap Track
                  </h3>
                  <p className="text-xs text-slate-400">
                    Step-by-step milestones curated by Gemini microservice
                  </p>
                </div>
              </div>

              <Link
                to="/roadmap"
                className="text-xs font-bold text-red-500 hover:text-red-400 hover:underline flex items-center gap-1"
              >
                Full Roadmap <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Next Steps List */}
            <div className="space-y-3">
              {(roadmap?.phases?.[0]?.milestones || [
                {
                  id: '1',
                  title: 'Core Fundamentals & ES6+ Architecture',
                  skills: ['JavaScript', 'Async/Await', 'Data Structures'],
                  status: 'completed',
                },
                {
                  id: '2',
                  title: 'Frontend Component Architecture with React.js',
                  skills: ['React.js', 'State Hooks', 'Tailwind CSS'],
                  status: 'pending',
                },
                {
                  id: '3',
                  title: 'Microservices & REST API Development',
                  skills: ['Node.js', 'Express', 'Spring Boot'],
                  status: 'pending',
                },
              ]).map((m, idx) => (
                <div
                  key={m.id || idx}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#161722] border border-[#252738] text-xs hover:border-red-600/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        m.status === 'completed'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                          : 'bg-[#1C1E2C] text-slate-400 border border-[#2D2E42]'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-bold text-white">{m.title}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        {(m.skills || []).map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-full text-[10px] bg-[#1C1E2C] text-slate-300 border border-[#2A2B3E]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant={m.status === 'completed' ? 'emerald' : 'slate'}
                    size="sm"
                  >
                    {m.status === 'completed' ? 'Completed' : 'Pending'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Col: Quick Skill Gaps & Assessments */}
        <div className="space-y-6">
          <Card className="p-6 bg-[#12131A] border border-[#222432] rounded-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E202B]">
              <div className="flex items-center gap-2">
                <GitFork className="w-5 h-5 text-red-500" />
                <h3 className="text-sm font-bold text-white">Target Skill Gaps</h3>
              </div>
              <Link to="/skill-gap" className="text-xs text-red-500 hover:underline">
                Analyze
              </Link>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              Essential competencies required for {activeCareer?.title || 'target role'}:
            </p>

            <div className="space-y-2.5">
              {(missingSkills.length > 0 ? missingSkills : [
                { name: 'Docker & Containerization', importance: 'Critical' },
                { name: 'System Design Patterns', importance: 'Critical' },
                { name: 'Cloud Deployment (AWS/Render)', importance: 'Required' },
              ]).map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#161722] border border-[#252738] text-xs"
                >
                  <span className="font-semibold text-slate-200">{skill.name}</span>
                  <Badge variant="rose" size="sm">
                    {skill.importance || 'Priority'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-[#12131A] border border-[#222432] rounded-2xl">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#1E202B]">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-red-500" />
                <h3 className="text-sm font-bold text-white">Assessment Hub</h3>
              </div>
              <Badge variant="indigo" size="sm">Instant Quiz</Badge>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Benchmark your skills with timed multiple-choice assessments.
            </p>
            <Link to="/assessment">
              <Button
                size="md"
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-full gap-2 shadow-md shadow-red-600/30"
              >
                Take Assessment <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
