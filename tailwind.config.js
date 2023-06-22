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
          100: '#21fc0d',
          200: '#13dc19',
          300: '#07bd1d',
          400: '#039f1e',
          500: '#04821c',
          600: '#076519',
          700: '#094a14',
          800: '#09310e',
          900: '#031a01',
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
  plugins: [],
};
