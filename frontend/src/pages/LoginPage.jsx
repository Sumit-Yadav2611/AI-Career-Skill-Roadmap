import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import { aiService } from '../services/aiService';
import { isMockMode } from '../services/api';
import Button from '../components/common/Button';
import FormInput from '../components/common/FormInput';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Call backend link as soon as user opens the Login page
  useEffect(() => {
    authService.prewarmBackend();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await login(email.trim(), password);

      // Jaise hi login ho, call AI service link and save response
      aiService.pingAiService().catch(() => {});

      if (res?.user?.isAdmin || res?.user?.role === 'ADMIN' || email.toLowerCase().includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(
        err?.message ||
        'Unable to sign in. Please check your credentials or backend server status.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAdminDemo = () => {
    setEmail('admin@careerroadmap.com');
    setPassword('Admin@12345');
  };

  const handleStudentDemo = () => {
    setEmail('aarav.sharma@college.edu');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex bg-[#090A0F] text-white">
      {/* Left Pane */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#12131A] via-[#0E0F16] to-[#1A0B10] p-12 flex-col justify-between text-white relative overflow-hidden border-r border-[#1E202B]">
        {/* Crimson Ambient Glows */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-600/15 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-red-600/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-700 to-red-500 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <Compass className="w-6 h-6" />
            </div>
            <span className="font-black text-xl tracking-tight text-white">
              CareerPath <span className="text-red-500">AI</span>
            </span>
          </Link>

          <div className="mt-20 max-w-md">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-950/70 border border-red-800/50 text-red-400 text-xs font-bold mb-4 shadow-[0_0_12px_rgba(239,68,68,0.25)]">
              <Sparkles className="w-3.5 h-3.5" /> Next-Gen Career Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
              AI-Driven Roadmaps & Precision Skill Gap Analytics.
            </h2>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Log in to sync your backend resume, generate real-time AI learning roadmaps with Gemini, and access administrator telemetries.
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-3 max-w-sm">
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
            <span>AI microservice integration via Render backend</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
            <span>Resume upload & instant update synchronizer</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
            <span>Role-based access: Student Dashboard & Admin Portal</span>
          </div>
        </div>


      </div>

      {/* Right Pane: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md space-y-7">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Sign in to your account
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Don't have an account yet?{' '}
              <Link to="/register" className="font-bold text-red-500 hover:text-red-400 hover:underline">
                Register here
              </Link>
            </p>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="p-3.5 rounded-2xl bg-[#12131A] border border-[#222432] space-y-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Quick Test Autofill
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleStudentDemo}
                className="flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg bg-[#181924] text-slate-200 hover:bg-[#202230] border border-[#2B2C3C] transition-colors"
              >
                Student Demo
              </button>
              <button
                type="button"
                onClick={handleAdminDemo}
                className="flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg bg-red-950/60 text-red-400 hover:bg-red-950/80 border border-red-800/60 transition-colors flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Demo
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              id="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <FormInput
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              size="lg"
              className="w-full mt-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-full shadow-lg shadow-red-600/35 transition-all"
              isLoading={loading}
            >
              Sign In to Platform <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
