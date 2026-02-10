import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/features/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          main: "var(--color-bg-main)",
          card: "var(--color-bg-card)",
          soft: "var(--color-bg-soft)",
          muted: "var(--color-bg-muted)",
        },
        text: {
          title: "var(--color-text-title)",
          body: "var(--color-text-body)",
          muted: "var(--color-text-muted)",
          placeholder: "var(--color-text-placeholder)",
        },
        brand: {
          main: "var(--color-brand-main)",
          hover: "var(--color-brand-hover)",
          soft: "var(--color-brand-soft)",
          "soft-hover": "var(--color-brand-soft-hover)",
        },
        field: {
          border: "var(--color-field-border)",
          hover: "var(--color-field-hover)",
          focus: "var(--color-field-focus)",
        },
        error: "var(--color-error)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
      },
      fontFamily: {
        fa: ["var(--font-fa)"],
        en: ["var(--font-en)"],
      },
    },
  },
  plugins: [],
};
export default config;
