import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const FormInput = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon: Icon,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative rounded-xl">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full rounded-xl border bg-[#12131A] px-3.5 py-2.5 text-sm text-white transition-colors placeholder:text-slate-500 focus:outline-none focus:ring-2 disabled:bg-[#181924] disabled:text-slate-500 ${
            Icon ? 'pl-10' : ''
          } ${
            isPassword ? 'pr-11' : ''
          } ${
            error
              ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
              : 'border-[#252738] focus:border-red-600 focus:ring-red-600/30'
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-red-400" />
            ) : (
              <Eye className="w-4 h-4 text-slate-400 hover:text-slate-200" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      {!error && helperText && <p className="mt-1 text-xs text-slate-400">{helperText}</p>}
    </div>
  );
};

export default FormInput;
