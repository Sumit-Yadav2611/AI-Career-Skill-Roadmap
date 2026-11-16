import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-[#090A0F] text-white">
      <div className="w-16 h-16 rounded-3xl bg-red-950/80 border border-red-800/60 text-red-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(239,68,68,0.35)]">
        <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
      </div>
      <h1 className="text-3xl font-black text-white">404 - Page Not Found</h1>
      <p className="mt-2 text-xs text-slate-400 max-w-sm">
        The roadmap or module you're looking for doesn't exist or has moved.
      </p>
      <Link to="/dashboard" className="mt-6">
        <Button
          size="md"
          className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 text-white font-bold rounded-full gap-2 px-6 shadow-lg shadow-red-600/30"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
