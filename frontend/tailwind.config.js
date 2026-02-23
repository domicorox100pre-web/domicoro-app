/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'domi-dark': '#0a0a0a',
        'domi-card': '#1a1a1a',
        'domi-red': '#EF3340',
        'domi-blue': '#0057B8',
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
    },
  },
  plugins: [],
}