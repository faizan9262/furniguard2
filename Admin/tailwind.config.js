/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": 'rgb(45, 155, 103)',
        "secondary": 'rgb(50, 105, 81)'
      }
    },
  },
  plugins: [],
}