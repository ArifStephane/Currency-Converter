/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat"],
    },

    extend: {
      colors: {
        primary: "#285F4B",
      },

    },
  },
  plugins: [],
}
