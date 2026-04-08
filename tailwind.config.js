/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./hooks/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Segoe UI",
          "sans-serif"
        ]
      },
      boxShadow: {
        premium: "0 28px 90px rgba(0, 0, 0, 0.38)",
        soft: "0 18px 48px rgba(0, 0, 0, 0.2)"
      }
    }
  },
  plugins: []
};
