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
          DEFAULT: '#0a0a0f',
          soft: '#111118',
        },
        surface: '#1a1a24',
        accent: {
          DEFAULT: '#390f56',
          soft: '#4d1570',
          dark: '#2a0b3f',
          light: '#a78bfa',
          text: '#c4b5fd',
        },
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgba(0,0,0,0.2), 0 1px 3px 1px rgba(0,0,0,0.1)',
        glow: '0 0 20px rgba(57, 15, 86, 0.4)',
        'glow-lg': '0 0 40px rgba(57, 15, 86, 0.5)',
        '3d': '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 5px 15px -3px rgba(0, 0, 0, 0.3)',
        '3d-hover': '0 20px 40px -5px rgba(57, 15, 86, 0.4), 0 10px 25px -3px rgba(0, 0, 0, 0.4)'
      },
      animation: {
        'scroll-left': 'scroll-left 30s linear infinite',
        'scroll-right': 'scroll-right 30s linear infinite',
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
