import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: "#000080",
          maroon: "#800000",
          orange: "#E85D04",
        },
        neutral: {
          cream: "#FFFBF5",
          white: "#FFFFFF",
          black: "#1A1A1A",
          grey: "#6B7280",
        },
        accent: {
          olive: "#556B2F",
          gold: "#FFD700",
        },
        status: {
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.12)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        devanagari: ["var(--font-noto-devanagari)", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3rem", { lineHeight: "1.2" }],
        "display": ["2.25rem", { lineHeight: "1.3" }],
        "body": ["1rem", { lineHeight: "1.5" }],
      },
    },
  },
  plugins: [],
};

export default config;
