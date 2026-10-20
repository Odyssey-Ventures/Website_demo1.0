import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1F44",
          950: "#071530",
          800: "#102A5C",
          700: "#1B3A78",
          600: "#2A4D94",
          100: "#E6ECF7",
          50: "#F3F6FB",
        },
        line: "#E3E8F0",
        mist: "#F5F7FB",
        muted: "#56627A",
      },
      fontFamily: {
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
