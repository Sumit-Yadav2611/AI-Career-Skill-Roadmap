/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#090A0F',
          surface: '#0E0F16',
          card: '#12131A',
          cardHover: '#161722',
          border: '#202230',
          borderRed: '#38161E',
          pill: '#181924',
          pillBorder: '#2B2C3C',
        },
        brand: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        crimson: {
          light: '#ff4d4d',
          DEFAULT: '#e50914',
          dark: '#b80710',
          glow: 'rgba(229, 9, 20, 0.35)',
        },
        accent: {
          cyan: '#06b6d4',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#ef4444',
          purple: '#a855f7',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -4px rgba(220, 38, 38, 0.35)',
        'glow-accent': '0 0 25px -4px rgba(239, 68, 68, 0.4)',
        'glow-crimson': '0 0 20px 2px rgba(229, 9, 20, 0.3)',
      }
    },
  },
  plugins: [],
}
