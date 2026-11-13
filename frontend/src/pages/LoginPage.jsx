import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isMockMode } from '../services/api';
import { isMockMode } from '../services/api';
import Button from '../components/common/Button';
import FormInput from '../components/common/FormInput';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(
    isMockMode ? 'aarav.sharma@college.edu' : ''
  );
  const [password, setPassword] = useState(isMockMode ? 'password123' : '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email.trim(), password);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Unable to sign in. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    if (!isMockMode) return;

    setError('');
    setEmail('aarav.sharma@college.edu');
    setPassword('password123');

    try {
      setLoading(true);
      await login('aarav.sharma@college.edu', 'password123');
      navigate('/dashboard');
    } catch {
      setError('Demo login failed. Please try registering a local demo account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-indigo-950 to-brand-950 p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-lg">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">
              CareerPath <span className="text-brand-400">AI</span>
            </span>
          </Link>

          <div className="mt-20 max-w-md">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Career Guidance Platform
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight leading-snug">
              Build a clearer path toward your ideal engineering career.
            </h2>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              Sign in to manage your profile, review your skills, take assessments, and work through your learning roadmap.
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-3 max-w-sm">
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Student profile and resume management</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Technical assessments and skill analysis</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Personalized multi-phase learning roadmaps</span>
          </div>
        </div>

        <div className="relative z-10 text-[11px] text-slate-400">
          Career & Skill Roadmap Platform
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sign in to your account
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Don't have an account yet?{' '}
              <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
                Register for free
              </Link>
            </p>
          </div>

          {isMockMode && (
            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-brand-900">Development demo account</p>
                <p className="text-[11px] text-brand-700">
                  Uses sample student data. This option is disabled in production builds.
                </p>
              </div>
              <Button size="sm" onClick={handleDemoLogin} isLoading={loading}>
                1-Click Demo
              </Button>
            </div>
          )}

          {isMockMode && (
            <p className="text-[11px] leading-relaxed text-amber-700">
              Development-only: local demo accounts do not verify passwords and profile data stays in this browser. Do not enter a real password or sensitive personal information.
            </p>
          )}

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
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
              className="w-full mt-2 shadow-md shadow-brand-500/20"
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
