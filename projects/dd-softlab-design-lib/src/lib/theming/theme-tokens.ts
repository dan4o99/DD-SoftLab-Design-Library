import { TokenMetaData } from "./theme-types";

const tokenMeta: TokenMetaData = {
  description: "DD Design System Tokens",
  tokens: [
    {
      name: "color.surface",
      token: "color.surface",
      variable: "--dd-color-surface",
      description: "Main page surface color",
    },
    {
      name: "color.surfaceAlt",
      token: "color.surface.alt",
      variable: "--dd-color-surface-alt",
      description: "Alternate surface color for containers",
    },
    {
      name: "color.text",
      token: "color.text",
      variable: "--dd-color-text",
      description: "Primary text color",
    },
    {
      name: "color.textMuted",
      token: "color.text.muted",
      variable: "--dd-color-text-muted",
      description: "Muted text color",
    },
    {
      name: "color.primary",
      token: "color.primary",
      variable: "--dd-color-primary",
      description: "Primary brand color",
    },
    {
      name: "color.primaryContrast",
      token: "color.primary.contrast",
      variable: "--dd-color-primary-contrast",
      description: "Text color used on primary surfaces",
    },
    {
      name: "color.border",
      token: "color.border",
      variable: "--dd-color-border",
      description: "Border and divider color",
    },
    {
      name: "color.danger",
      token: "color.danger",
      variable: "--dd-color-danger",
      description: "Danger/destructive action color",
    },
    {
      name: "color.dangerContrast",
      token: "color.danger.contrast",
      variable: "--dd-color-danger-contrast",
      description: "Text color used on danger surfaces",
    },
    {
      name: "color.success",
      token: "color.success",
      variable: "--dd-color-success",
      description: "Success/positive action color",
    },
    {
      name: "color.successContrast",
      token: "color.success.contrast",
      variable: "--dd-color-success-contrast",
      description: "Text color used on success surfaces",
    },
    {
      name: "color.warning",
      token: "color.warning",
      variable: "--dd-color-warning",
      description: "Warning/caution action color",
    },
    {
      name: "color.warningContrast",
      token: "color.warning.contrast",
      variable: "--dd-color-warning-contrast",
      description: "Text color used on warning surfaces",
    },
    {
      name: "radius.sm",
      token: "radius.sm",
      variable: "--dd-radius-sm",
      description: "Small border radius",
    },
    {
      name: "radius.md",
      token: "radius.md",
      variable: "--dd-radius-md",
      description: "Medium border radius",
    },
    {
      name: "radius.lg",
      token: "radius.lg",
      variable: "--dd-radius-lg",
      description: "Large border radius",
    },
    {
      name: "space.xs",
      token: "space.xs",
      variable: "--dd-space-xs",
      description: "Extra small spacing",
    },
    {
      name: "space.sm",
      token: "space.sm",
      variable: "--dd-space-sm",
      description: "Small spacing",
    },
    {
      name: "space.md",
      token: "space.md",
      variable: "--dd-space-md",
      description: "Medium spacing",
    },
    {
      name: "space.lg",
      token: "space.lg",
      variable: "--dd-space-lg",
      description: "Large spacing",
    },
    {
      name: "font.family.base",
      token: "font.family.base",
      variable: "--dd-font-family-base",
      description: "Base font family",
    },
    {
      name: "font.size.base",
      token: "font.size.base",
      variable: "--dd-font-size-base",
      description: "Base font size",
    },
    {
      name: "shadow.sm",
      token: "shadow.sm",
      variable: "--dd-shadow-sm",
      description: "Small shadow",
    },
    {
      name: "shadow.md",
      token: "shadow.md",
      variable: "--dd-shadow-md",
      description: "Medium shadow",
    },
  ],
};

export const DD_THEME_TOKENS = tokenMeta;

export const DD_TOKEN_TO_CSS_VAR: Record<string, string> =
  tokenMeta.tokens.reduce<Record<string, string>>((acc, token) => {
    acc[token.name] = token.variable;

    return acc;
  }, {});

export function toCssVar(tokenName: string): string {
  const cssVariableName = DD_TOKEN_TO_CSS_VAR[tokenName];

  if (!cssVariableName) {
    return `var(${tokenName})`;
  }

  return `var(${cssVariableName})`;
}
