/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        boardBG: "var(--board-bg-color)",
        asideBG: "var(--asaide-bg)",
        spacialPurple: "#9A85F4",
        primColor: "var(--prim-text-color)",
        secColor: "var(--sec-text-color)",
      },
    },
  },
  plugins: [],
  prefix: "tw-",
};
