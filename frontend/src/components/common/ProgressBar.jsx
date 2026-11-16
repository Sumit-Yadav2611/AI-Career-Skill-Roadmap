import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  color = 'indigo',
  size = 'md',
  showLabel = false,
  label = '',
  className = ''
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const colorStyles = {
    indigo: 'bg-gradient-to-r from-red-600 to-red-500 shadow-[0_0_12px_rgba(220,38,38,0.5)]',
    emerald: 'bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]',
    amber: 'bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]',
    rose: 'bg-gradient-to-r from-red-600 to-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]',
    purple: 'bg-gradient-to-r from-purple-600 to-purple-400',
    cyan: 'bg-gradient-to-r from-cyan-600 to-cyan-400',
  };

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-semibold text-slate-300">
          <span>{label}</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-[#181924] border border-[#262838] rounded-full overflow-hidden ${heightStyles[size] || heightStyles.md}`}>
        <div
          className={`${heightStyles[size] || heightStyles.md} rounded-full transition-all duration-500 ease-out ${
            colorStyles[color] || colorStyles.indigo
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
