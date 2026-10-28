import React from 'react';
import { Heart, Compass, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-brand-600 flex items-center justify-center text-white">
            <Compass className="w-3 h-3" />
          </div>
          <span className="font-semibold text-slate-700">
            CareerPath AI Platform
          </span>
          <span>•</span>
          <span>SPMP Lab 3 Software Engineering Project</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            JWT Stateless Auth
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            NLP Resume Skill Parsing
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
