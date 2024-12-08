/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary' : "#a8d5ba"
      },
      gridTemplateColumns:{
        'auto' : 'repeat(auto-fill , minmax(200px , 1fr))'
      }
    },
  },
  plugins: [],
}