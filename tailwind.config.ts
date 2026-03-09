import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        s9: {
          black: "#000000",
          "bg-deep": "#050505",
          bg: "#0a0a0a",
          surface: "#111111",
          elevated: "#191919",
          "surface-bright": "#222222",
          "border-subtle": "rgba(255,255,255,0.06)",
          border: "rgba(255,255,255,0.10)",
          "border-strong": "rgba(255,255,255,0.15)",
          "text-faint": "#404040",
          "text-muted": "#666666",
          "text-subtle": "#888888",
          "text-secondary": "#a3a3a3",
          "text-primary": "#ededed",
          white: "#fafafa",
        },
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "ping-slow": "ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "ping-slower": "ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        marquee: "marquee 40s linear infinite",
        scan: "scan 3s linear infinite",
        "drift-1": "drift1 20s ease-in-out infinite",
        "drift-2": "drift2 25s ease-in-out infinite",
        "drift-3": "drift3 18s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "glow-breathe": "glow-breathe 4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "ping-slow": {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        "ping-slower": {
          "75%, 100%": { transform: "scale(3)", opacity: "0" },
        },
        drift1: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        drift2: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-40px, 30px) scale(1.15)" },
          "66%": { transform: "translate(25px, -35px) scale(0.85)" },
        },
        drift3: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(35px, 25px) scale(1.1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-breathe": {
          "0%, 100%": { opacity: "0.03" },
          "50%": { opacity: "0.08" },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(255,255,255,0.03)",
        glow: "0 0 40px rgba(255,255,255,0.04)",
        "glow-lg": "0 0 80px rgba(255,255,255,0.06)",
        "card": "0 1px 2px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
        "card-hover": "0 8px 30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12)",
        "elevated": "0 16px 50px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
