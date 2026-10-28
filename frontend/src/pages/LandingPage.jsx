import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  FileText,
  BrainCircuit,
  GitFork,
  MapPin,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  BarChart3,
  Users,
  Target
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

export const LandingPage = () => {
  const features = [
    {
      icon: FileText,
      color: 'indigo',
      title: 'NLP Resume Skill Parsing',
      description: 'Upload your PDF resume. Our NLP pipeline automatically extracts programming languages, libraries, education, and projects.'
    },
    {
      icon: BrainCircuit,
      color: 'purple',
      title: 'Interactive Assessment Quizzes',
      description: 'Test your core concepts in Web Development, DSA, and Machine Learning with timed quizzes and real-time score analytics.'
    },
    {
      icon: GitFork,
      color: 'emerald',
      title: 'Automated Skill Gap Analysis',
      description: 'Instantly view the delta between your existing skill set and what top tech companies require for your dream role.'
    },
    {
      icon: MapPin,
      color: 'amber',
      title: 'Dynamic Personalized Roadmap',
      description: 'Follow actionable weekly milestones curated with top industry documentation, video masterclasses, and capstone projects.'
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Create Student Profile & Upload Resume',
      desc: 'Enter your degree, CGPA, and drop your PDF resume for instant automated NLP parsing.'
    },
    {
      step: '02',
      title: 'Take Domain Assessment Quizzes',
      desc: 'Attempt adaptive multiple-choice questions to validate your real-world proficiency.'
    },
    {
      step: '03',
      title: 'ML Career Prediction & Gap Matrix',
      desc: 'Our supervised ML model predicts your highest-match career and highlights missing skills.'
    },
    {
      step: '04',
      title: 'Execute Customized Milestones',
      desc: 'Check off milestones step-by-step, watch your readiness score climb, and land your goal role.'
    }
  ];

  const stats = [
    { label: 'Prediction Accuracy', value: '94.2%', icon: Target },
    { label: 'Tech Careers Mapped', value: '50+', icon: Layers },
    { label: 'Milestones Completed', value: '18,500+', icon: CheckCircle2 },
    { label: 'Student Readiness Gain', value: '+42%', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-4 sm:px-6 max-w-7xl mx-auto text-center">
        {/* Glow ambient background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-300/30 via-indigo-200/20 to-purple-300/30 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-200/80 shadow-xs mb-8 animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-brand-600" />
          <span className="text-xs font-bold text-brand-800">
            AI-Powered Career & Skill Roadmap Platform
          </span>
          <Badge variant="indigo" size="sm">
            SPMP Lab 3
          </Badge>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight max-w-4xl mx-auto leading-[1.15]">
          Bridge the Gap Between Your <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Current Skills & Dream Career
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Extract skills from your resume with NLP, validate knowledge with timed technical quizzes, receive ML-driven career recommendations, and follow a personalized step-by-step learning roadmap.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/register">
            <Button size="lg" className="shadow-lg shadow-brand-500/25 gap-2">
              Start Free Assessment <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="gap-2">
              Explore Demo Dashboard
            </Button>
          </Link>
        </div>

        {/* Feature Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Tier Cloud Ready
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> JWT Stateless Security
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> ML Career Prediction Engine
          </span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-200/80 bg-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4 Core Features */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="indigo" size="md" className="mb-3">
            Platform Capabilities
          </Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Everything Students Need to Accelerate Placement
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Engineered with a 4-component architecture: React frontend, Spring Boot / Node backend, Python ML microservice, and MySQL database.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card key={i} hover className="p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 4-Step Interactive Workflow */}
      <section className="py-20 bg-slate-900 text-white px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2 text-white">
              From Resume Upload to Targeted Placement
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              A transparent, automated four-step lifecycle designed to guide engineering graduates.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((item, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-brand-500/50 transition-colors"
              >
                <div className="text-2xl font-black text-brand-400 mb-3 font-mono">
                  {item.step}
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Call To Action */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-700 text-white shadow-xl relative overflow-hidden text-center">
          <div className="relative z-10">
            <Badge variant="amber" size="sm" className="mb-4 text-amber-900 bg-amber-200">
              Instant Career Roadmap
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Discover Your Ideal Tech Career?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-brand-100 max-w-xl mx-auto">
              Join students analyzing their skills, mastering missing gaps, and following personalized roadmaps today.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-brand-700 hover:bg-slate-100 font-bold shadow-lg">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 border border-white/30">
                  Already Registered? Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default LandingPage;
