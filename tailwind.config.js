/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "input": "0 0 0 2px rgba(0,0,0,.1), 0 0 0 6px rgba(0,0,0,.05)",
        "checked": "inset 0 0 0 4px #292524, inset 0 0 0 10px #10b981 ",
      },
      gridTemplateColumns: {
        "item": "1fr minmax(40px, 80px)",
        "send": "1fr 80px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};