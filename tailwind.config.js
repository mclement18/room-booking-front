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
        'electric-lightblue': {
          100: '#00d8ff',
          200: '#04bdde',
          300: '#07a3bf',
          400: '#0889a0',
          500: '#097083',
          600: '#095867',
          700: '#07414c',
          800: '#062c33',
          900: '#00181c',
        },

        'electric-blue': {
          100: '#0b24fb',
          200: '#0028e0',
          300: '#0028c4',
          400: '#0026a8',
          500: '#00238d',
          600: '#001e71',
          700: '#001856',
          800: '#00123c',
          900: '#020623',
        },

        'electric-violet': {
          100: '#8f00ff',
          200: '#7d0cdf',
          300: '#6b11c0',
          400: '#5b13a2',
          500: '#4b1385',
          600: '#3b1268',
          700: '#2d0f4d',
          800: '#1f0c34',
          900: '#13001c',
        },

        'electric-pink': {
          100: '#ff00e1',
          200: '#dd12c6',
          300: '#bb19aa',
          400: '#9c1a90',
          500: '#7d1a75',
          600: '#61175c',
          700: '#461343',
          800: '#2c0e2b',
          900: '#170015',
        },

        'electric-red': {
          100: '#ff0000',
          200: '#e3000f',
          300: '#c60016',
          400: '#a90018',
          500: '#8d0018',
          600: '#710116',
          700: '#550513',
          800: '#3b060c',
          900: '#250000',
        },

        'electric-orange': {
          100: '#ff3503',
          200: '#e12e0d',
          300: '#c42811',
          400: '#a62313',
          500: '#8a1e13',
          600: '#6e1a11',
          700: '#53150f',
          800: '#3a1009',
          900: '#230800',
        },

        'electric-yellow': {
          100: '#d0ff00',
          200: '#b5e00b',
          300: '#9bc111',
          400: '#83a313',
          500: '#6b8612',
          600: '#546b11',
          700: '#3f500e',
          800: '#2b370a',
          900: '#1a1f00',
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
