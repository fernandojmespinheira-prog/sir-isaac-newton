import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ivory: "#F5F1E8", parchment: "#E9E1D2", ink: "#252525", gold: "#A88B55", "gold-dark": "#7A5F2E", stone: "#675F54" },
    fontFamily: { serif: ["var(--font-serif)", "Georgia", "serif"], sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
  } },
  plugins: [],
} satisfies Config;
