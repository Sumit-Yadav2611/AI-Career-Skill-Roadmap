import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = false,
  glass = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl transition-all duration-200 ${
        glass
          ? 'glass-panel text-white'
          : 'bg-[#12131A] border border-[#202230] text-slate-100 shadow-lg'
      } ${
        hover
          ? 'hover:shadow-[0_4px_25px_rgba(220,38,38,0.15)] hover:border-red-600/50 hover:-translate-y-0.5'
          : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
