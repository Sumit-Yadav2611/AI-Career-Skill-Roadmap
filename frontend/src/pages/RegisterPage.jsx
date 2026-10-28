import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Mail,
  Lock,
  User,
  GraduationCap,
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockCareers } from '../services/mockData';
import Button from '../components/common/Button';
import FormInput from '../components/common/FormInput';

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
    degree: 'B.Tech in Computer Science',
    branch: 'Computer Science',
    semester: '6th Semester',
    cgpa: '8.2',
    targetCareerId: 'full-stack'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
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

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Pane */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-slate-900 via-indigo-950 to-brand-950 p-12 flex-col justify-between text-white relative">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-lg">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">
              CareerPath <span className="text-brand-400">AI</span>
            </span>
          </Link>

          <div className="mt-16 max-w-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Fast Onboarding
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight leading-snug">
              Begin Your Placement Readiness Journey.
            </h2>
            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              Complete your student profile to allow our ML model to accurately benchmark your skills against industry standards.
            </p>
          </div>
        </div>

        <div className="text-[11px] text-slate-400">
          SPMP AI-Based Career & Skill Roadmap Platform
        </div>
      </div>

      {/* Right Pane: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-lg space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create Student Account
            </h2>
            <p className="mt-1.5 text-xs text-slate-500">
              Already registered?{' '}
              <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
                Sign in here
              </Link>
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
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
                label="College Email"
                placeholder="aarav@college.edu"
                icon={Mail}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="••••••••"
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
                placeholder="••••••••"
                icon={Lock}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Academic & Career Information
              </p>

              <div className="space-y-3">
                <FormInput
                  id="college"
                  name="college"
                  label="College / University Name"
                  placeholder="e.g. National Institute of Technology"
                  icon={GraduationCap}
                  value={formData.college}
                  onChange={handleChange}
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Degree
                    </label>
                    <select
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="B.Tech in Computer Science">B.Tech (CSE)</option>
                      <option value="B.Tech in Information Tech">B.Tech (IT)</option>
                      <option value="BCA">BCA</option>
                      <option value="MCA">MCA</option>
                      <option value="M.Tech">M.Tech</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Semester
                    </label>
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="4th Semester">4th Sem</option>
                      <option value="5th Semester">5th Sem</option>
                      <option value="6th Semester">6th Sem</option>
                      <option value="7th Semester">7th Sem</option>
                      <option value="8th Semester">8th Sem</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Current CGPA
                    </label>
                    <input
                      name="cgpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={formData.cgpa}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Target Career Role
                  </label>
                  <select
                    name="targetCareerId"
                    value={formData.targetCareerId}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                  >
                    {mockCareers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.demand} Demand)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full mt-4 shadow-md shadow-brand-500/20"
              isLoading={loading}
            >
              Complete Registration & Enter Dashboard <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
