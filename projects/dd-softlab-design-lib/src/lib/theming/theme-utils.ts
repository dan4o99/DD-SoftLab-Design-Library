import { DD_TOKEN_TO_CSS_VAR } from './theme-tokens';
import { ColorSchemeName, ThemeDefinition, ThemeTokenMap } from './theme-types';

export function resolveThemeTokens(theme: ThemeDefinition, scheme: ColorSchemeName): ThemeTokenMap {
  return {
    ...theme.preset,
    ...theme.colorScheme[scheme],
  };
}

export function themeTokensToCssVariables(tokens: ThemeTokenMap): Record<string, string> {
  const cssVars: Record<string, string> = {};

  for (const [tokenName, tokenValue] of Object.entries(tokens)) {
    const cssVarName = DD_TOKEN_TO_CSS_VAR[tokenName];

    if (cssVarName) {
      cssVars[cssVarName] = tokenValue;
    }
  }

  return cssVars;
}

export function applyCssVariables(cssVariables: Record<string, string>, target: HTMLElement): void {
  for (const [name, value] of Object.entries(cssVariables)) {
    target.style.setProperty(name, value);
  }
}
