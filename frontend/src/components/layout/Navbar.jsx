import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Bell,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  Menu,
  FileText,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useRoadmap } from '../../hooks/useRoadmap';
import Badge from '../common/Badge';

export const Navbar = ({ onToggleSidebar }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { activeCareer, careers, selectTargetCareer } = useRoadmap();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const isAdmin =
    user?.isAdmin ||
    user?.role === 'ADMIN' ||
    user?.authorities?.includes('ROLE_ADMIN') ||
    user?.email?.toLowerCase().includes('admin');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0B0C12]/95 backdrop-blur-md border-b border-[#1E202B] px-4 sm:px-6">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto gap-4">
        {/* Left: Hamburger Button & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-300 hover:text-white hover:bg-[#181924] rounded-xl transition-all border border-[#262838] hover:border-red-600/50 flex items-center justify-center cursor-pointer shadow-sm group"
            aria-label="Toggle Hamburger Menu"
            title="Open Navigation Menu"
          >
            <Menu className="w-5 h-5 text-slate-300 group-hover:text-red-500 transition-colors" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-700 via-red-600 to-red-500 flex items-center justify-center text-white shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-base tracking-tight text-white">
                CareerPath <span className="text-red-500">AI</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                Roadmap Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Target Career Pill */}
        {isAuthenticated && activeCareer && (
          <div className="hidden md:flex items-center gap-2 bg-[#12131A] border border-[#252738] px-3.5 py-1.5 rounded-full shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="text-xs text-slate-400 font-medium">Target Role:</span>
            <select
              value={activeCareer.id}
              onChange={(e) => selectTargetCareer(e.target.value)}
              className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
            >
              {careers.map((c) => (
                <option key={c.id} value={c.id} className="bg-[#12131A] text-white">
                  {c.title}
                </option>
              ))}
            </select>
            <Badge variant="rose" size="sm" className="bg-red-950/70 text-red-400 border-red-800/60 font-bold">
              {activeCareer.matchScore || 85}% Match
            </Badge>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              {/* Quick Resume Button (Like reference screenshot) */}
              <Link
                to="/profile"
                className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg shadow-red-600/40 transition-all hover:scale-102"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </Link>

              {/* Notification Popover */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-slate-300 hover:text-white hover:bg-[#181924] rounded-xl relative transition-colors border border-[#252738]"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0B0C12]" />
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#12131A] rounded-2xl shadow-2xl border border-[#2B2C3E] py-3 z-50">
                    <div className="flex items-center justify-between px-4 pb-2 border-b border-[#1E202B]">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Notifications
                      </span>
                      <span className="text-[11px] text-red-400 hover:underline cursor-pointer">
                        Mark read
                      </span>
                    </div>
                    <div className="divide-y divide-[#1C1E2A] max-h-60 overflow-y-auto">
                      {(user?.notifications || [
                        { id: 1, title: 'AI service synchronized', time: 'Just now' },
                      ]).map((n) => (
                        <div key={n.id} className="p-3 hover:bg-[#181924] text-xs">
                          <p className="font-semibold text-slate-200">{n.title}</p>
                          <span className="text-[10px] text-slate-500 mt-1 block">
                            {n.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 pl-2 hover:bg-[#181924] rounded-full transition-colors border border-[#252738]"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-red-950/80 border border-red-800/60 flex items-center justify-center text-red-400 font-bold text-xs shadow-sm">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-slate-200 max-w-[100px] truncate">
                    {user?.name || 'Student'}
                  </span>
                  {isAdmin && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-red-950 text-red-400 font-bold border border-red-800/60 hidden sm:inline">
                      ADMIN
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#12131A] rounded-2xl shadow-2xl border border-[#2B2C3E] py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-[#1E202B]">
                      <p className="text-xs font-bold text-white truncate">
                        {user?.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {user?.email}
                      </p>
                      {isAdmin && (
                        <p className="text-[10px] font-bold text-red-400 mt-0.5">
                          ROLE: ADMINISTRATOR
                        </p>
                      )}
                    </div>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-950/40"
                      >
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                        Admin Portal
                      </Link>
                    )}

                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#181924] hover:text-white"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      Student Profile & Resume
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-400 hover:bg-red-950/30 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-xs font-bold text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 px-5 py-2 rounded-full shadow-lg shadow-red-600/30"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
