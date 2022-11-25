/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-blue': 'rgb(31, 48, 101)',
        'theme-green': 'rgb(52, 168, 83)',
        'theme-green-b': 'rgba(52, 168, 83, 0.5)',
        'theme-red': 'rgb(210, 42, 40)',
        'theme-coral': 'rgb(229, 89, 119)',
        'theme-yellow': 'rgb(251, 188, 5)',
        'light-black': 'rgba(34,38,40,255)',
        'dark-black': 'rgba(24,29,31,255)'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require("@tailwindcss/line-clamp")
  ],
}
