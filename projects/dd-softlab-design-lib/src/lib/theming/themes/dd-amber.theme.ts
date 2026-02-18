import { ThemeDefinition } from "../theme-types";
import { BASE_PRESET } from "./base-preset";

export const DD_AMBER_THEME: ThemeDefinition = {
  name: "DD-Amber",
  label: "DD-Amber",
  preset: {
    ...BASE_PRESET,
  },
  colorScheme: {
    light: {
      "color.surface": "#fffbf0",
      "color.surfaceAlt": "#fef3c7",
      "color.text": "#45230b",
      "color.textMuted": "#78350f",
      "color.primary": "#d97706",
      "color.primaryContrast": "#ffffff",
      "color.border": "#fcd34d",
      "color.danger": "#dc2626",
      "color.dangerContrast": "#ffffff",
      "color.success": "#16a34a",
      "color.successContrast": "#ffffff",
      "color.warning": "#eab308",
      "color.warningContrast": "#ffffff",
      "shadow.sm": "0 1px 2px rgba(217, 119, 6, 0.08)",
      "shadow.md": "0 10px 24px rgba(217, 119, 6, 0.12)",
    },
    dark: {
      "color.surface": "#2d1f0f",
      "color.surfaceAlt": "#422006",
      "color.text": "#fde09b",
      "color.textMuted": "#fcd34d",
      "color.primary": "#fbbf24",
      "color.primaryContrast": "#1f1410",
      "color.border": "#b45309",
      "color.danger": "#f87171",
      "color.dangerContrast": "#1f1410",
      "color.success": "#86efac",
      "color.successContrast": "#1f1410",
      "color.warning": "#fde047",
      "color.warningContrast": "#1f1410",
      "shadow.sm": "0 1px 2px rgba(217, 119, 6, 0.2)",
      "shadow.md": "0 10px 24px rgba(217, 119, 6, 0.4)",
    },
  },
};
