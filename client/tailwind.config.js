/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink': '#8a8589',
      },
      backgroundImage: {
        'blue': 'linear-gradient(to right top, #848485, #999a9c, #aeb0b4, #c3c7cc, #d8dfe5);',

      }
    },
  },
  plugins: [],
}  