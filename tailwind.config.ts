import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: "#fdf2f4",
          100: "#fce7ea",
          200: "#f9d0d6",
          300: "#f4a7b3",
          400: "#ec7185",
          500: "#e0475c",
          600: "#cc2a42",
          700: "#aa1e33",
          800: "#7B1C2B",
          900: "#6b1826",
          950: "#3d0c15",
        },
        white: "#FFFFFF",
        offwhite: "#FAFAFA",
        surface: "#F5F0EB",
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans Devanagari", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(123, 28, 43, 0.10)",
        glow: "0 0 24px 0 rgba(123, 28, 43, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
