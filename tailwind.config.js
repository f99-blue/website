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
        _red: "#c41616;",
      },
      boxShadow: {
        _normal: "rgba(0, 0, 0, 0.08) 0px 4px 12px;",
      },
    },
  },
  plugins: [],
};
