import { ThemeDefinition } from "../theme-types";
import { BASE_PRESET } from "./base-preset";

export const DD_CYBERPUNK_THEME: ThemeDefinition = {
  name: "DD-Cyberpunk",
  label: "DD-Cyberpunk",
  preset: {
    ...BASE_PRESET,
  },
  colorScheme: {
    light: {
      "color.surface": "#f5f1ff",
      "color.surfaceAlt": "#ede5ff",
      "color.text": "#2e1a47",
      "color.textMuted": "#5a3f7d",
      "color.primary": "#b723d5",
      "color.primaryContrast": "#ffffff",
      "color.border": "#d8b4ff",
      "color.danger": "#ff006e",
      "color.dangerContrast": "#ffffff",
      "color.success": "#00d084",
      "color.successContrast": "#ffffff",
      "color.warning": "#ffb703",
      "color.warningContrast": "#ffffff",
      "shadow.sm": "0 1px 2px rgba(183, 35, 213, 0.16)",
      "shadow.md": "0 10px 24px rgba(183, 35, 213, 0.22)",
    },
    dark: {
      "color.surface": "#0a0015",
      "color.surfaceAlt": "#1a002b",
      "color.text": "#ff00ff",
      "color.textMuted": "#b300ff",
      "color.primary": "#ff00ff",
      "color.primaryContrast": "#0a0015",
      "color.border": "#7700bb",
      "color.danger": "#ff006e",
      "color.dangerContrast": "#0a0015",
      "color.success": "#00ff41",
      "color.successContrast": "#0a0015",
      "color.warning": "#ffbe0b",
      "color.warningContrast": "#0a0015",
      "shadow.sm": "0 1px 2px rgba(255, 0, 255, 0.3)",
      "shadow.md": "0 10px 24px rgba(255, 0, 255, 0.4)",
    },
  },
};
