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
    },
  },
  plugins: [],
};
