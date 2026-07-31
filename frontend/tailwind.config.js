/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: "#1B5E20",
        secondary: "#8BC34A",
        accent: "#D4A017",
        dark: "#111827",
      },

      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        serif: ["PT Serif", "serif"],
      },

      boxShadow: {
        card:
          "0 10px 30px rgba(0,0,0,.12)",
      },
    },
  },

  plugins: [],
};

