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
        background: {
          primary: "#02040a",
          secondary: "#05070c",
          card: "#0a0d14",
        },
        accent: {
          orange: "#f97316",
          "orange-light": "#fb923c",
          "orange-dark": "#ea580c",
        },
      },
    },
  },
  plugins: [],
};
export default config;
