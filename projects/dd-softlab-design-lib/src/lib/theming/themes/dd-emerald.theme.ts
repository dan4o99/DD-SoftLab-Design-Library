import { ThemeDefinition } from "../theme-types";
import { BASE_PRESET } from "./base-preset";

export const DD_EMERALD_THEME: ThemeDefinition = {
  name: "DD-Emerald",
  label: "DD-Emerald",
  preset: {
    ...BASE_PRESET,
  },
  colorScheme: {
    light: {
      "color.surface": "#f0fdf4",
      "color.surfaceAlt": "#dcfce7",
      "color.text": "#052e16",
      "color.textMuted": "#166534",
      "color.primary": "#059669",
      "color.primaryContrast": "#ffffff",
      "color.border": "#6ee7b7",
      "color.danger": "#d32f2f",
      "color.dangerContrast": "#ffffff",
      "color.success": "#10b981",
      "color.successContrast": "#ffffff",
      "color.warning": "#f59e0b",
      "color.warningContrast": "#ffffff",
      "shadow.sm": "0 1px 2px rgba(5, 150, 105, 0.08)",
      "shadow.md": "0 10px 24px rgba(5, 150, 105, 0.12)",
    },
    dark: {
      "color.surface": "#051b11",
      "color.surfaceAlt": "#0d3b2b",
      "color.text": "#ccfbf1",
      "color.textMuted": "#99f6e0",
      "color.primary": "#2dd4bf",
      "color.primaryContrast": "#051410",
      "color.border": "#14b8a6",
      "color.danger": "#f87171",
      "color.dangerContrast": "#051410",
      "color.success": "#4ade80",
      "color.successContrast": "#051410",
      "color.warning": "#fbbf24",
      "color.warningContrast": "#051410",
      "shadow.sm": "0 1px 2px rgba(45, 212, 191, 0.2)",
      "shadow.md": "0 10px 24px rgba(45, 212, 191, 0.4)",
    },
  },
};
