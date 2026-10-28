import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  BrainCircuit,
  GitFork,
  MapPin,
  X,
  Sparkles,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../common/ProgressBar';

export const Sidebar = ({ isOpen, onClose }) => {
  const { activeCareer, roadmap } = useRoadmap();
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile & Resume', to: '/profile', icon: UserCheck },
    { name: 'Assessments', to: '/assessment', icon: BrainCircuit },
    { name: 'Skill Gap Analysis', to: '/skill-gap', icon: GitFork },
    { name: 'Learning Roadmap', to: '/roadmap', icon: MapPin },
  ];

  const readinessScore = roadmap?.readinessScore || user?.careerReadiness || 72;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 lg:hidden">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-brand-600" />
            <span className="font-bold text-slate-800 text-sm">Navigation</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Core Modules
          </p>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => onClose && onClose()}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-brand-600' : 'text-slate-400'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-brand-500" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Career Readiness Mini Card */}
        <div className="p-4 m-3 rounded-2xl bg-gradient-to-br from-brand-50 via-indigo-50 to-purple-50 border border-brand-100/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span className="text-[11px] font-bold text-brand-900 uppercase tracking-wider">
                Career Readiness
              </span>
            </div>
            <span className="text-xs font-extrabold text-brand-700">
              {readinessScore}%
            </span>
          </div>

          <ProgressBar
            value={readinessScore}
            max={100}
            color={readinessScore >= 80 ? 'emerald' : readinessScore >= 50 ? 'indigo' : 'amber'}
            size="sm"
          />

          <div className="mt-3 pt-2.5 border-t border-brand-200/50 flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-medium truncate max-w-[120px]">
              {activeCareer?.title || 'Full-Stack Web'}
            </span>
            <NavLink
              to="/roadmap"
              onClick={() => onClose && onClose()}
              className="text-[11px] font-bold text-brand-600 hover:underline"
            >
              Roadmap &rarr;
            </NavLink>
          </div>
        </div>

        {/* Version / SPMP Footer */}
        <div className="p-3 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400">
            CSRP v1.0 • AI-Powered Career Platform
          </p>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
