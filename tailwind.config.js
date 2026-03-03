/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8fb',
          100: '#d5eef5',
          200: '#afdded',
          300: '#7cc5e0',
          400: '#48a6cc',
          500: '#2d8ab3',
          600: '#1f6e96',
          700: '#1a5a7a',
          800: '#1a4d65',
          900: '#1b4155',
          950: '#0d2a39',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
