/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'theme-red': '#de483a',
      },
      backgroundImage: {
        'search-icon': "url('./components/icons/lupa.png')",
      }
    },
  },
  plugins: [],
}

