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
  ShieldAlert,
  GraduationCap,
  LogOut,
} from 'lucide-react';
import { useRoadmap } from '../../hooks/useRoadmap';
import { useAuth } from '../../hooks/useAuth';
import ProgressBar from '../common/ProgressBar';

export const Sidebar = ({ isOpen, onClose }) => {
  const { activeCareer, roadmap } = useRoadmap();
  const { user, logout } = useAuth();

  const isAdmin =
    user?.isAdmin ||
    user?.role === 'ADMIN' ||
    user?.authorities?.includes('ROLE_ADMIN') ||
    user?.email?.toLowerCase().includes('admin');

  const navigation = [
    { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile & Resume', to: '/profile', icon: UserCheck },
    { name: 'Assessments', to: '/assessment', icon: BrainCircuit },
    { name: 'Skill Gap Analysis', to: '/skill-gap', icon: GitFork },
    { name: 'Learning Roadmap', to: '/roadmap', icon: MapPin },
  ];

  if (isAdmin) {
    navigation.push({
      name: 'Admin Portal',
      to: '/admin',
      icon: ShieldAlert,
      isAdminItem: true,
    });
  }

  const readinessScore = roadmap?.readinessScore || user?.careerReadiness || 78;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Hamburger Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0B0C12] border-r border-[#1E202B] flex flex-col transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1E202B]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-800/60 flex items-center justify-center text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-white text-sm tracking-tight block">
                Navigation Menu
              </span>
              <span className="text-[10px] text-slate-400 block -mt-0.5">
                AI Career Ecosystem
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#181924] transition-colors"
            aria-label="Close Navigation Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        {user && (
          <div className="p-3.5 mx-3 mt-3 rounded-xl bg-[#12131A] border border-[#222432]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-red-950/90 border border-red-800/60 flex items-center justify-center text-red-400 font-bold text-xs shadow-inner">
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">
                  {user.name || user.fullName || 'Student User'}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {user.email}
                </p>
              </div>
              {isAdmin && (
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-950 text-red-400 font-extrabold border border-red-800/70 shadow-[0_0_8px_rgba(239,68,68,0.3)]">
                  ADMIN
                </span>
              )}
            </div>
          </div>
        )}

        {/* Navigation items */}
        <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
            Modules & Tools
          </p>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isSpecialAdmin = item.isAdminItem;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => onClose && onClose()}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isSpecialAdmin
                      ? isActive
                        ? 'bg-red-950/80 text-red-400 border border-red-800/80 shadow-[0_0_12px_rgba(239,68,68,0.25)]'
                        : 'text-red-400 hover:bg-red-950/40 hover:text-red-300 border border-red-900/30'
                      : isActive
                      ? 'bg-[#181924] text-white border border-red-600/40 shadow-sm'
                      : 'text-slate-400 hover:bg-[#161722] hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isSpecialAdmin
                            ? 'text-red-500'
                            : isActive
                            ? 'text-red-500'
                            : 'text-slate-500'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>
                    {isSpecialAdmin ? (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-950 text-red-400 font-bold border border-red-800/60">
                        PORTAL
                      </span>
                    ) : (
                      isActive && <ChevronRight className="w-3.5 h-3.5 text-red-500" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Career Readiness Mini Card */}
        <div className="p-4 m-3 rounded-2xl bg-[#12131A] border border-[#222432] shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                Career Readiness
              </span>
            </div>
            <span className="text-xs font-black text-red-500">
              {readinessScore}%
            </span>
          </div>

          <ProgressBar
            value={readinessScore}
            max={100}
            color={readinessScore >= 80 ? 'rose' : 'amber'}
            size="sm"
          />

          <div className="mt-3 pt-2.5 border-t border-[#1E202B] flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-medium truncate max-w-[130px]">
              {activeCareer?.title || 'Full-Stack Developer'}
            </span>
            <NavLink
              to="/roadmap"
              onClick={() => onClose && onClose()}
              className="text-[11px] font-bold text-red-500 hover:text-red-400 hover:underline"
            >
              Roadmap &rarr;
            </NavLink>
          </div>
        </div>

        {/* Logout button & Version Footer */}
        <div className="p-3 border-t border-[#1E202B] space-y-2">
          {user && (
            <button
              onClick={() => {
                logout();
                onClose && onClose();
              }}
              className="w-full flex items-center justify-center gap-2 p-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          )}
          <p className="text-[10px] text-slate-500 text-center">
            CareerPath AI • Learning Platform
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
