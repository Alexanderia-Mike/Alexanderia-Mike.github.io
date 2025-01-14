/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        'border-color': '#ccc'
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.hidden': { display: "none !important" },
      });
    },
  ],
}

