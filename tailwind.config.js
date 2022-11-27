/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          disabled: "var(--color-text-disabled)",
        },
        bg: {
          default: "var(--bg-default)",
          paper: "var(--bg-paper)",
        },
        primary: {
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
          A100: "var(--color-primary-A100)",
          A200: "var(--color-primary-A200)",
          A400: "var(--color-primary-A400)",
          A700: "var(--color-primary-A700)",
        },
        secondary: {
          light: "var(--color-light-secondary)",
          main: "var(--color-main-secondary)",
          dark: "var(--color-dark-secondary)",
        },
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
    }),
    textColor: (theme) => ({
      ...theme("colors"),
    }),
    keyframes: {
      loading: {
        "0%  , 100%": {
          transform: "scale(.6)",
        },
        "50%": {
          transform: "scale(1)",
        },
      },
      spinner: {
        "0%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(360deg)",
        },
      },
    },
    animation: {
      loading: "loading 1s ease-in-out infinite",
      loading_delay: "loading 1s ease-in-out .5s infinite",
      spinner: "spinner 1s linear infinite",
    },
  },
};
