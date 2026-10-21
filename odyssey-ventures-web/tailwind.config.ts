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
        brand: {
          blue: "#3129F2",
          "blue-dark": "#2119C9",
          "blue-tint": "#EEEDFE",
          green: "#29F27C",
        },
        line: "#E3E8F0",
        mist: "#F5F7FB",
        muted: "#56627A",
      },
      fontFamily: {
        // No build-time network calls. Korean and English both have suitable system fallbacks.
        display: ["Arial", "Apple SD Gothic Neo", "Malgun Gothic", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Arial", "Apple SD Gothic Neo", "Malgun Gothic", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11, 31, 68, 0.04), 0 10px 30px -18px rgba(11, 31, 68, 0.18)",
        "card-hover": "0 2px 4px rgba(11, 31, 68, 0.06), 0 18px 40px -16px rgba(11, 31, 68, 0.28)",
      },
      maxWidth: { content: "72rem" },
    },
  },
  plugins: [],
};

export default config;
