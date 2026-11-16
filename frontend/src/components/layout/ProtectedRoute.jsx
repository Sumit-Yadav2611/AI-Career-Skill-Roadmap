import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090A0F]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-red-900 border-t-red-500 rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isAdmin = user?.isAdmin || user?.role === 'ADMIN' || user?.email?.toLowerCase().includes('admin');
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
