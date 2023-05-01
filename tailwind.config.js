/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        _red: "#c41616",
        gray: {
          900: "rgb(17, 17, 17)",
          800: "rgb(27, 27, 27)",
          700: "rgb(54, 54, 57)",
          600: "rgb(67, 67, 72)",
          500: "#4f5058",
          400: "#595a64",
          300: "#a6adb3",
          200: "#d1d5d9",
          175: "#dddce6",
          150: "#eeedf4",
          100: "#f5f5f5",
        },
      },
      boxShadow: {
        _normal: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
      },
    },
  },
  plugins: [],
};
