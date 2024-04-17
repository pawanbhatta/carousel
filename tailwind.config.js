/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl":
          "0 4px 30px rgba(0, 0, 0, 0.1), inset 7px 5px 3px -3px #fff9, inset 5px 5px 10px -3px #fff6, inset -5px -5px 10px -3px #0006",
      },
    },
  },
  plugins: [],
};
