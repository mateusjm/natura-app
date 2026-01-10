/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        folio: ["Folio", "Inter", "sans-serif"], 
      },
    },
  },
  plugins: [],
};
