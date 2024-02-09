/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#a7bdd7",
        secondary: "#74343f",
        accent: "#b48d5a",
        bkg: {
          100: "#11161b",
          200: "#090e14"
        },
        whitish: "#ebeff6"
      },
      fontFamily: {
        poppins: ["Poppins"]
      }
    },
  },
  plugins: [],
}

