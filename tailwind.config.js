/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        grayhl: "#edf1f5",
        secondary: {
          DEFAULT: "#2F1D49",
          text: "#EFB3CA",
        },
        pink: "#EE3D94",
        orange: "#F7941C",
      },
    },
  },
  plugins: [],
};
