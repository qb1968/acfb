/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1f3d1f", // dark green theme
        accent: "#d4af37",  // gold accent
      },
    },
  },
  plugins: [],
};

