import { ThemeDefinition } from "../theme-types";
import { BASE_PRESET } from "./base-preset";

export const DD_METAL_THEME: ThemeDefinition = {
  name: "DD-Metal",
  label: "DD-Metal",
  preset: {
    ...BASE_PRESET,
  },
  colorScheme: {
    light: {
      "color.surface": "#f9fafb",
      "color.surfaceAlt": "#f3f4f6",
      "color.text": "#1f2937",
      "color.textMuted": "#6b7280",
      "color.primary": "#6b7280",
      "color.primaryContrast": "#ffffff",
      "color.border": "#d1d5db",
      "color.danger": "#7c3aed",
      "color.dangerContrast": "#ffffff",
      "color.success": "#059669",
      "color.successContrast": "#ffffff",
      "color.warning": "#d97706",
      "color.warningContrast": "#ffffff",
      "shadow.sm": "0 1px 2px rgba(107, 114, 128, 0.08)",
      "shadow.md": "0 10px 24px rgba(107, 114, 128, 0.12)",
    },
    dark: {
      "color.surface": "#1f2937",
      "color.surfaceAlt": "#374151",
      "color.text": "#f3f4f6",
      "color.textMuted": "#d1d5db",
      "color.primary": "#9ca3af",
      "color.primaryContrast": "#111827",
      "color.border": "#4b5563",
      "color.danger": "#a78bfa",
      "color.dangerContrast": "#1f2937",
      "color.success": "#6ee7b7",
      "color.successContrast": "#1f2937",
      "color.warning": "#fbbf24",
      "color.warningContrast": "#1f2937",
      "shadow.sm": "0 1px 2px rgba(0, 0, 0, 0.2)",
      "shadow.md": "0 10px 24px rgba(0, 0, 0, 0.4)",
    },
  },
};
