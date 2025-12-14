import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        accent: "#f18f03",
        dark: "#2f3233",
        graymain: "#6d7172",
        graylight: "#f6f7f8",
        graymid: "#d7d9da"
      },
      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,0.08)",
        card: "0 16px 32px rgba(0,0,0,0.08)",
        accent: "0 10px 25px rgba(241,143,3,0.28)",
        accentHover: "0 14px 32px rgba(241,143,3,0.34)"
      },
      borderRadius: {
        xl2: "14px"
      }
    }
  },
  plugins: []
};

export default config;
