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
      boxShadow: {
        "custom-shadow": "0px 3px 8px 0px rgba(230, 230, 231, 0.2)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
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
