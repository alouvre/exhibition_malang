/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        generalsans: ['General Sans', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        helvetica: ['"Helvetica Neue"', 'Helvetica', 'Switzer', 'Arimo', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
