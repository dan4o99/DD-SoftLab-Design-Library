import { ThemeDefinition } from "../theme-types";
import { BASE_PRESET } from "./base-preset";

export const DD_FIRE_THEME: ThemeDefinition = {
  name: "DD-Fire",
  label: "DD-Fire",
  preset: {
    ...BASE_PRESET,
  },
  colorScheme: {
    light: {
      "color.surface": "#fef3f2",
      "color.surfaceAlt": "#fef7f3",
      "color.text": "#4a1f1a",
      "color.textMuted": "#7d4a45",
      "color.primary": "#dc2626",
      "color.primaryContrast": "#ffffff",
      "color.border": "#f5a8a2",
      "color.danger": "#9e1b1b",
      "color.dangerContrast": "#ffffff",
      "color.success": "#16a34a",
      "color.successContrast": "#ffffff",
      "color.warning": "#ea580c",
      "color.warningContrast": "#ffffff",
      "shadow.sm": "0 1px 2px rgba(220, 38, 38, 0.08)",
      "shadow.md": "0 10px 24px rgba(220, 38, 38, 0.12)",
    },
    dark: {
      "color.surface": "#3a0f0d",
      "color.surfaceAlt": "#5a2420",
      "color.text": "#fecaca",
      "color.textMuted": "#fca5a5",
      "color.primary": "#f87171",
      "color.primaryContrast": "#1f2937",
      "color.border": "#d97760",
      "color.danger": "#ff6b6b",
      "color.dangerContrast": "#1f2937",
      "color.success": "#4ade80",
      "color.successContrast": "#1f2937",
      "color.warning": "#fb923c",
      "color.warningContrast": "#1f2937",
      "shadow.sm": "0 1px 2px rgba(220, 38, 38, 0.2)",
      "shadow.md": "0 10px 24px rgba(220, 38, 38, 0.4)",
    },
  },
};
