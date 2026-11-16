import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Mail,
  Lock,
  User,
  Sparkles,
  ArrowRight,
  AlertCircle,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import Button from '../components/common/Button';
import FormInput from '../components/common/FormInput';

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Call backend link as soon as user opens the Register page
  useEffect(() => {
    authService.prewarmBackend();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must contain at least 8 characters (backend requirement).');
      return;
    }

    try {
      setLoading(true);
      const res = await register(formData);
      if (formData.isAdmin || res?.user?.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(
        err?.message ||
        'Registration failed. Please check backend connection or verify email uniqueness.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#090A0F] text-white">
      {/* Left Pane */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-[#12131A] via-[#0E0F16] to-[#1A0B10] p-12 flex-col justify-between text-white relative border-r border-[#1E202B]">
        <div className="absolute top-1/4 -left-16 w-80 h-80 bg-red-600/15 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-700 to-red-500 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <Compass className="w-6 h-6" />
            </div>
            <span className="font-black text-xl tracking-tight text-white">
              CareerPath <span className="text-red-500">AI</span>
            </span>
          </Link>

          <div className="mt-16 max-w-sm">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-950/70 border border-red-800/50 text-red-400 text-xs font-bold mb-4 shadow-[0_0_12px_rgba(239,68,68,0.25)]">
              <Sparkles className="w-3.5 h-3.5" /> Rapid Onboarding
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              Begin Your AI-Powered Career Journey.
            </h2>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed">
              Create your account to unlock personalized roadmaps, resume ATS parsing, and benchmark assessments.
            </p>
          </div>
        </div>


      </div>

      {/* Right Pane: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-lg space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Create Your Account
            </h2>
            <p className="mt-1.5 text-xs text-slate-400">
              Already registered?{' '}
              <Link to="/login" className="font-bold text-red-500 hover:text-red-400 hover:underline">
                Sign in here
              </Link>
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              id="name"
              name="name"
              label="Full Name"
              placeholder="e.g. Aarav Sharma"
              icon={User}
              value={formData.name}
              onChange={handleChange}
              required
            />

            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="you@university.edu"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="grid sm:grid-cols-2 gap-3">
              <FormInput
                id="password"
                name="password"
                type="password"
                label="Password (min 8 chars)"
                placeholder="Create strong password"
                icon={Lock}
                value={formData.password}
                onChange={handleChange}
                required
              />

              <FormInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Repeat password"
                icon={Lock}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Admin toggle checkbox */}
            <div className="p-3.5 rounded-xl bg-[#12131A] border border-[#222432] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-red-500" />
                <div>
                  <label htmlFor="isAdmin" className="text-xs font-bold text-white cursor-pointer block">
                    Register as Administrator
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Enables access to the Admin Portal on the hamburger menu.
                  </p>
                </div>
              </div>
              <input
                id="isAdmin"
                name="isAdmin"
                type="checkbox"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-[#181924] border-[#2E3042] cursor-pointer"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-full shadow-lg shadow-red-600/35"
              isLoading={loading}
            >
              Complete Registration <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
