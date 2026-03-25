/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf2',
          100: '#ddfbe2',
          200: '#bdf5c6',
          300: '#8beb9d',
          400: '#52d86b',
          500: '#2abb47',
          600: '#1d9a35',
          700: '#1b7a2e',
          800: '#1a6129',
          900: '#175024',
          950: '#072c11',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
