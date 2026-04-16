// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kings: ['Kings', 'cursive'],
        monoton: ['Monoton', 'sans-serif'],
      },
    },
  },
  plugins: [],
};