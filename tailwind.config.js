import plugin from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        cell: "4px 4px 0px 0px #000000",
        button: "6px 6px 0px 0px #000000",
        card: "8px 8px 0px 0px #000000",
      },
      colors: {
        flash: {
          normal: "#fbff00",
          darken: "#f4ea05",
        },
        poppy: "#ff0000",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("row", '&[data-row="2"}]');
    }),
  ],
};
