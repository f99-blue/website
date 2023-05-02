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
          900: "rgb(15, 15, 15)",
          800: "rgb(25, 25, 25)",
          700: "rgb(42, 42, 42)",
          600: "rgb(67, 67, 72)",
          500: "#4f5058",
          400: "#595a64",
          300: "rgb(166, 166, 176)",
          200: "#d1d5d9",
          175: "#dddce6",
          150: "#eeedf4",
          100: "#f5f5f5",
        },
      },
      boxShadow: {
        _normal: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
      },
      borderRadius: {
        "2xl": "1.2rem",
      },
    },
  },
  plugins: [],
};
