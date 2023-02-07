/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "sans": ["nitti-typewriter-normal"],
        "highlight": ["nitti-typewriter-cameo"],
        "open": ["nitti-typewriter-open"],
        "corrected": ["nitti-typewriter-corrected"],
        "underlined": ["nitti-typewriter-underlined"],
      }
    },
  },
  plugins: [],
}
