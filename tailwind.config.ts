import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "nav-bg": "#0D0D0D",
        "layout-bg": "#1A1A1A",
        "dark-blue": "#1E6F9F",
        "light-blue": "#4EA8DE",
        "lavender-blue": "#8284FA",
        "button-text": "#F2F2F2",
        "badge-gray": "#333333",
        "text-gray": "#808080",
        "task-card-bg": "#262626",
      },
    },
  },
  plugins: [],
} satisfies Config;
