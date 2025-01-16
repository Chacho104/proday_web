import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        background: "#222c41",
        "cards-background": "#2e384e",
        "warm-yellow": "#ffc107",
        "border-color": "#3b455c",
        "main-text": "#a7adb4",
        "sub-text": "#808080",
        "completed-task": " #4caf50",
        "type-badge": "#28a745",
        "urgency-badge": "#ff5733",
        "importance-badge": "#ffc300",
        "deadline-badge": "#17a2b8",
        "task-badge-one": "#00a300",
        "task-badge-two": "#dc143c",
        "task-badge_three": "#008ba7",
        "task-badge-four": "#F065FF",
        "delete-btn": "#ff0000",
        "text-field-bg": "#e5e5e5",
        "nav-bg": "#0D0D0D",
        "layout-bg": "#1A1A1A",
        "dark-blue": "#1E6F9F",
        "light-blue": "#4EA8DE",
        "lavender-blue": "#8284FA",
        "button-text": "#F2F2F2",
        "badge-gray": "#333333",
        "text-gray": "#808080",
        "task-card-bg": "#262626",
        "modal-bg": "#e5e5e5",
      },
    },
  },
  plugins: [],
} satisfies Config;
