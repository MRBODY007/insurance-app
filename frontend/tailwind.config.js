/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        thai: ["Kanit", "Sarabun", "Prompt", "Noto Sans Thai", "sans-serif"],
      },
    },
  },
  plugins: [],
};
