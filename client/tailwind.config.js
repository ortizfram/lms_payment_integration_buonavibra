/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        alifira: ['Alifira', 'sans-serif'],
        briemhand: ['Briem Hand', 'cursive'],
      },
    }
  },
  plugins: [],
}