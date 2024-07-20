/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#34667a",
          dark: "#024059",
          light: "#678c9b",
        },
        secondary: "#562B08",
        main: "#FAF5FF",
        accent: "#000",
      },
      fontFamily: {
        merriWeather: "Merriweather Sans",
      },
    },
  },
  plugins: [
    require("tw-elements/plugin.cjs"),
  ],
  darkMode: "class",
};