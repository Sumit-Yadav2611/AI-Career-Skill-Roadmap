import React from 'react';

export const Badge = ({
  children,
  variant = 'indigo',
  size = 'md',
  className = '',
  icon: Icon
}) => {
  const variantStyles = {
    indigo: 'bg-[#181A28] text-indigo-400 border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.15)]',
    emerald: 'bg-[#0E2018] text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]',
    amber: 'bg-[#221808] text-amber-400 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]',
    rose: 'bg-red-950/60 text-red-400 border border-red-800/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]',
    purple: 'bg-[#1E112A] text-purple-400 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.15)]',
    cyan: 'bg-[#0B1E24] text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.15)]',
    slate: 'bg-[#181922] text-slate-300 border border-[#2B2C3C]',
  };

  const sizeStyles = {
    sm: 'text-[10px] sm:text-[11px] px-2.5 py-0.5 gap-1 font-semibold rounded-full',
    md: 'text-xs px-3 py-1 gap-1.5 font-semibold rounded-full',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold rounded-full',
  };

  return (
    <span
      className={`inline-flex items-center tracking-wide ${
        sizeStyles[size] || sizeStyles.md
      } ${variantStyles[variant] || variantStyles.indigo} ${className}`}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
};

export default Badge;
