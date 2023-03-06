/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter var", "sans-serif"],
        form: ["Montserrat", "san-serif"],
      },
      colors: {
        primary: "#7eb09b",
        secondry: "#475B5A",
        accent: "#ffd700",
        neutral: "#ffffff",
        active: "#fe5f55",
        success: "#71EAC0",
        error: "#F26E9A",
      },
      screens: {
        maxSize: "1440px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#7eb09b",
          secondry: "#475B5A",
          accent: "#ffd700",
          neutral: "#ffffff",
          active: "#fe5f55",
          success: "#71EAC0",
          error: "#F26E9A",
        },
      },
    ],
  },
};
