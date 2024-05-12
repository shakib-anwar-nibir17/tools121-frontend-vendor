/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E2EEFF",
          100: "#FEC81B",
          200: "#d9dadb",
          300: "#ffffff",
          400: "#D84234",
          500: "#49ADF4",
          600: "#8F9195",
          700: "#0077B5",
          800: "#1A83A8",
          900: "#0d6efd",
          950: "#01060d",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
