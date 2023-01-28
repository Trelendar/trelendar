module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        barlow: ['"Barlow Condensed"', 'san-serif'],
        segoeUi: ['"Segoe UI"', 'san-serif'],
      },
      colors: {
        loginButon: '#5AAC44',
        titleLogin: '#253858',
        colorHome: 'rgb(54, 32, 121, 0.75)',
      },
      spacing: {
        line: '0.0625rem',
      },
      backgroundImage: {
        'office-home':
          "linear-gradient(rgb(54, 201, 208, 0.65), rgba(54, 32, 121, 0.65)), url('https://img.freepik.com/premium-vector/kanban-board-with-business-strategy-cartoon-plan-stickers_543062-2067.jpg?w=2000')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
