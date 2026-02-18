import { ThemeDefinition } from "../theme-types";
import { BASE_PRESET } from "./base-preset";

export const DD_SOFTLAB_THEME: ThemeDefinition = {
  name: "DD-SoftLab",
  label: "DD-SoftLab",
  preset: {
    ...BASE_PRESET,
  },
  colorScheme: {
    light: {
      "color.surface": "#f8fafc",
      "color.surfaceAlt": "#ffffff",
      "color.text": "#0f172a",
      "color.textMuted": "#475569",
      "color.primary": "#2563eb",
      "color.primaryContrast": "#ffffff",
      "color.border": "#cbd5e1",
      "color.danger": "#dc2626",
      "color.dangerContrast": "#ffffff",
      "color.success": "#16a34a",
      "color.successContrast": "#ffffff",
      "color.warning": "#ea580c",
      "color.warningContrast": "#ffffff",
      "shadow.sm": "0 1px 2px rgba(2, 6, 23, 0.08)",
      "shadow.md": "0 10px 24px rgba(2, 6, 23, 0.12)",
    },
    dark: {
      "color.surface": "#020617",
      "color.surfaceAlt": "#111827",
      "color.text": "#e2e8f0",
      "color.textMuted": "#94a3b8",
      "color.primary": "#38bdf8",
      "color.primaryContrast": "#0f172a",
      "color.border": "#334155",
      "color.danger": "#ef4444",
      "color.dangerContrast": "#111827",
      "color.success": "#4ade80",
      "color.successContrast": "#111827",
      "color.warning": "#fb923c",
      "color.warningContrast": "#111827",
      "shadow.sm": "0 1px 2px rgba(148, 163, 184, 0.08)",
      "shadow.md": "0 10px 24px rgba(0, 0, 0, 0.4)",
    },
  },
};
