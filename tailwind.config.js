/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: false,
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
