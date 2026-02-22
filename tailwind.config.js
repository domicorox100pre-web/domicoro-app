/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'domi-red': '#EF3340',
        'domi-blue': '#002D62',
        'domi-dark': '#0a0a0a',
        'domi-card': '#161616',
      }
    },
  },
  plugins: [],
}
