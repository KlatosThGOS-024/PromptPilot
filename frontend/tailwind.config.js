/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBlue1: "#101524",
        lightBlue2: "#161C2E",
        lightBlue3: "#101420",
      },
      fontFamily: {
        domine: ["Domine", "serif"],
        lexend: ["Lexend Deca", "sans-serif"],
      },
    },
  },
  plugins: [],
};
