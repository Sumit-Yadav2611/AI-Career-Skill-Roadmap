import React from 'react';

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#090A0F] disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-xl';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 rounded-lg',
    md: 'text-xs sm:text-sm px-5 py-2.5 gap-2 rounded-xl',
    lg: 'text-sm sm:text-base px-6 py-3.5 gap-2.5 rounded-full',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400 focus:ring-red-500 shadow-md shadow-red-600/30',
    secondary:
      'bg-[#181924] text-slate-200 border border-[#2B2C3C] hover:bg-[#202230] hover:text-white hover:border-red-600/40 focus:ring-slate-400 shadow-sm',
    accent:
      'bg-emerald-600 text-white hover:bg-emerald-500 focus:ring-emerald-500 shadow-md shadow-emerald-600/30',
    outline:
      'border border-red-600/80 text-red-400 hover:bg-red-950/40 hover:text-red-300 focus:ring-red-500',
    ghost:
      'text-slate-300 hover:text-white hover:bg-white/5 focus:ring-slate-400',
    glass:
      'bg-white/10 text-white border border-white/20 backdrop-blur-md shadow-lg hover:bg-white/15 focus:ring-white/40',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-sm',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : Icon ? (
        <Icon className={`w-4 h-4 ${children ? '' : 'm-0'}`} />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
