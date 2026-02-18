import { ThemeDefinition } from "../theme-types";
import { BASE_PRESET } from "./base-preset";

export const DD_EARTH_THEME: ThemeDefinition = {
  name: "DD-Earth",
  label: "DD-Earth",
  preset: {
    ...BASE_PRESET,
  },
  colorScheme: {
    light: {
      "color.surface": "#faf9f7",
      "color.surfaceAlt": "#f5f3f0",
      "color.text": "#42342f",
      "color.textMuted": "#7d6f68",
      "color.primary": "#8b4513",
      "color.primaryContrast": "#ffffff",
      "color.border": "#d9cec4",
      "color.danger": "#c41e3a",
      "color.dangerContrast": "#ffffff",
      "color.success": "#2d5016",
      "color.successContrast": "#ffffff",
      "color.warning": "#b8621b",
      "color.warningContrast": "#ffffff",
      "shadow.sm": "0 1px 2px rgba(139, 69, 19, 0.08)",
      "shadow.md": "0 10px 24px rgba(139, 69, 19, 0.12)",
    },
    dark: {
      "color.surface": "#2a251f",
      "color.surfaceAlt": "#3d3530",
      "color.text": "#e8ddd4",
      "color.textMuted": "#c2b29e",
      "color.primary": "#cd7f32",
      "color.primaryContrast": "#1a1410",
      "color.border": "#5d4f46",
      "color.danger": "#ff6b9d",
      "color.dangerContrast": "#1a1410",
      "color.success": "#7ac943",
      "color.successContrast": "#1a1410",
      "color.warning": "#ff9f43",
      "color.warningContrast": "#1a1410",
      "shadow.sm": "0 1px 2px rgba(139, 69, 19, 0.2)",
      "shadow.md": "0 10px 24px rgba(139, 69, 19, 0.4)",
    },
  },
};
