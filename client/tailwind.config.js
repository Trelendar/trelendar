module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        barlow: ['"Barlow Condensed"', "san-serif"],
        segoeUi: ['"Segoe UI"', "san-serif"],
      },
      colors: {
        loginButon: "#5AAC44",
      },
      spacing: {
        line: "0.0625rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
