/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./routes/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      ringColor: {
        'gold': 'rgba(212, 175, 55, 0.5)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        navy: {
          800: '#1e293b',
          900: '#0f172a', // Deep corporate navy
          925: '#050a14', // Card/Modal Surface
          950: '#020617', // Void
        },
        gold: {
          400: '#d4af37',
          500: '#c5a028',
          600: '#b08d1e', // Muted gold for accents
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0', // Borders
          600: '#475569', // Body text
          800: '#1e293b', // Headings
        }
      },
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(to bottom right, #ffffff, #f8fafc)',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        'elevation': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
        'glow': '0 0 20px rgba(197, 160, 40, 0.15)',
        'gold-glow': '0 0 15px rgba(197, 160, 40, 0.3)',
        'neon-green': '0 0 10px rgba(118, 185, 0, 0.4)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'shake': 'shake 0.1s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%) skewX(12deg)' },
          '100%': { transform: 'translateX(200%) skewX(12deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      }
    },
  },
  plugins: [],
}
