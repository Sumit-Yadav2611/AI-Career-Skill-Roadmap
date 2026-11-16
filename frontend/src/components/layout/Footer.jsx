import React from 'react';
import { Compass } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0B0C12] border-t border-[#1E202B] py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-red-950/80 border border-red-800/60 flex items-center justify-center text-red-500">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-slate-300">
            CareerPath <span className="text-red-500">AI</span>
          </span>
        </div>

        <p className="text-slate-500">
          Powered by Google Gemini Microservice & Spring Boot Backend
        </p>
      </div>
    </footer>
  );
};

export default Footer;
