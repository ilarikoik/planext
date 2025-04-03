/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00A6A6',
        secondary: '#14213D',
        accent: '#FCA311',
        background: '#E5E5E5',
        textcolor: '#33333'
      }
    },
  },
  plugins: [],
}