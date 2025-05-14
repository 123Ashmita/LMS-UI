// tailwind.config.js
module.exports = {
  content: [
    "./index.html", // Include index.html for class scanning
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS, TS, JSX, and TSX files in the src folder
  ],
  theme: {
    extend: {}, // Here you can add your custom theme configuration
  },
  plugins: [], // You can add Tailwind plugins here if needed
}
