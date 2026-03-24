/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c7d7fe',
          300: '#a4bcfd',
          400: '#7c97fa',
          500: '#5b6cf5',
          600: '#4a4eea',
          700: '#3d3dcf',
          800: '#3434a8',
          900: '#2f3185',
          950: '#1e1d50',
        },
      },
    },
  },
  plugins: [],
};
