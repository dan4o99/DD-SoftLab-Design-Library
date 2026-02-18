import { ThemeDefinition } from "../theme-types";
import { BASE_PRESET } from "./base-preset";

export const DD_WATER_THEME: ThemeDefinition = {
  name: "DD-Water",
  label: "DD-Water",
  preset: {
    ...BASE_PRESET,
    "radius.sm": "8px",
    "radius.md": "12px",
    "radius.lg": "18px",
  },
  colorScheme: {
    light: {
      "color.surface": "#f0f9ff",
      "color.surfaceAlt": "#e0f2fe",
      "color.text": "#082f49",
      "color.textMuted": "#0c4a6e",
      "color.primary": "#0ea5e9",
      "color.primaryContrast": "#ffffff",
      "color.border": "#7dd3fc",
      "color.danger": "#dc2626",
      "color.dangerContrast": "#ffffff",
      "color.success": "#16a34a",
      "color.successContrast": "#ffffff",
      "color.warning": "#ea580c",
      "color.warningContrast": "#ffffff",
      "shadow.sm": "0 1px 2px rgba(14, 165, 233, 0.16)",
      "shadow.md": "0 10px 24px rgba(14, 165, 233, 0.22)",
    },
    dark: {
      "color.surface": "#051325",
      "color.surfaceAlt": "#0a1f33",
      "color.text": "#e0f2fe",
      "color.textMuted": "#94d7f9",
      "color.primary": "#22d3ee",
      "color.primaryContrast": "#0b1120",
      "color.border": "#1f6b91",
      "color.danger": "#ef4444",
      "color.dangerContrast": "#111827",
      "color.success": "#4ade80",
      "color.successContrast": "#111827",
      "color.warning": "#fb923c",
      "color.warningContrast": "#111827",
      "shadow.sm": "0 1px 2px rgba(14, 165, 233, 0.2)",
      "shadow.md": "0 12px 26px rgba(0, 0, 0, 0.5)",
    },
  },
};
