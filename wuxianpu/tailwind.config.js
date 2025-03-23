/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        'border-color': '#ccc',
        'custom-bg': '#e7e7e7',
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

