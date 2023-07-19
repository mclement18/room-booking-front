// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-flare':
          'linear-gradient(65deg, transparent 20%, rgba(255, 255, 255, 0.4) 20%, rgba(255, 255, 255, 0.6) 27%, transparent 27%, transparent 100%)',
      },
      fontFamily: {
        mono: 'var(--font-vt323)',
        title: 'var(--font-racespace)',
      },
      colors: {
        'electric-green': {
          100: 'var(--electric-green-100)',
          200: 'var(--electric-green-200)',
          300: 'var(--electric-green-300)',
          400: 'var(--electric-green-400)',
          500: 'var(--electric-green-500)',
          600: 'var(--electric-green-600)',
          700: 'var(--electric-green-700)',
          800: 'var(--electric-green-800)',
          900: 'var(--electric-green-900)',
        },
        'electric-lightblue': {
          100: 'var(--electric-lightblue-100)',
          200: 'var(--electric-lightblue-200)',
          300: 'var(--electric-lightblue-300)',
          400: 'var(--electric-lightblue-400)',
          500: 'var(--electric-lightblue-500)',
          600: 'var(--electric-lightblue-600)',
          700: 'var(--electric-lightblue-700)',
          800: 'var(--electric-lightblue-800)',
          900: 'var(--electric-lightblue-900)',
        },

        'electric-blue': {
          100: 'var(--electric-blue-100)',
          200: 'var(--electric-blue-200)',
          300: 'var(--electric-blue-300)',
          400: 'var(--electric-blue-400)',
          500: 'var(--electric-blue-500)',
          600: 'var(--electric-blue-600)',
          700: 'var(--electric-blue-700)',
          800: 'var(--electric-blue-800)',
          900: 'var(--electric-blue-900)',
        },

        'electric-violet': {
          100: 'var(--electric-violet-100)',
          200: 'var(--electric-violet-200)',
          300: 'var(--electric-violet-300)',
          400: 'var(--electric-violet-400)',
          500: 'var(--electric-violet-500)',
          600: 'var(--electric-violet-600)',
          700: 'var(--electric-violet-700)',
          800: 'var(--electric-violet-800)',
          900: 'var(--electric-violet-900)',
        },

        'electric-pink': {
          100: 'var(--electric-pink-100)',
          200: 'var(--electric-pink-200)',
          300: 'var(--electric-pink-300)',
          400: 'var(--electric-pink-400)',
          500: 'var(--electric-pink-500)',
          600: 'var(--electric-pink-600)',
          700: 'var(--electric-pink-700)',
          800: 'var(--electric-pink-800)',
          900: 'var(--electric-pink-900)',
        },

        'electric-red': {
          100: 'var(--electric-red-100)',
          200: 'var(--electric-red-200)',
          300: 'var(--electric-red-300)',
          400: 'var(--electric-red-400)',
          500: 'var(--electric-red-500)',
          600: 'var(--electric-red-600)',
          700: 'var(--electric-red-700)',
          800: 'var(--electric-red-800)',
          900: 'var(--electric-red-900)',
        },

        'electric-orange': {
          100: 'var(--electric-orange-100)',
          200: 'var(--electric-orange-200)',
          300: 'var(--electric-orange-300)',
          400: 'var(--electric-orange-400)',
          500: 'var(--electric-orange-500)',
          600: 'var(--electric-orange-600)',
          700: 'var(--electric-orange-700)',
          800: 'var(--electric-orange-800)',
          900: 'var(--electric-orange-900)',
        },

        'electric-yellow': {
          100: 'var(--electric-yellow-100)',
          200: 'var(--electric-yellow-200)',
          300: 'var(--electric-yellow-300)',
          400: 'var(--electric-yellow-400)',
          500: 'var(--electric-yellow-500)',
          600: 'var(--electric-yellow-600)',
          700: 'var(--electric-yellow-700)',
          800: 'var(--electric-yellow-800)',
          900: 'var(--electric-yellow-900)',
        },
      },
      minHeight: {
        'screen-d': ['100vh', '100dvh'],
      },
      animation: {
        flare: '5s linear 1.5s 1 forwards flare',
        'sparkle-right': '5s linear 1.7s 1 forwards sparkle',
        'sparkle-left': '5s linear 2.1s 1 forwards sparkle',
        blink: '0.4s step-end infinite blink',
      },
      keyframes: {
        flare: {
          '0%': { 'background-position': '-200px' },
          '30%, 100%': { 'background-position': '400px' },
        },
        sparkle: {
          '0%, 30%, 60%, 100%': { opacity: 0 },
          '40%': { opacity: 0.8 },
        },
        blink: {
          'from, to': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      boxShadow: {
        sparkle:
          '0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #FFF, 0 0 25px #FFF, 0 0 30px #FFF, 0 0 35px #FFF',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-terminal': {
          'scrollbar-width': 'thin',
          'scrollbar-color': 'var(--electric-green-600) transparent',
          '&::-webkit-scrollbar': {
            width: '8.5px',
            'background-color': 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'var(--electric-green-600)',
          },
        },
      });
    }),
  ],
};
