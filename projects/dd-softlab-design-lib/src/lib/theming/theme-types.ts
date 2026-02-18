export interface TokenMetaData {
  description: string;
  tokens: {
    name: string;
    token: string;
    variable: string;
    description: string;
  }[];
}

export type ThemeTokenMap = Record<string, string>;

export interface ThemeDefinition {
  name: ThemeName;
  label: string;
  preset: ThemeTokenMap;
  colorScheme: Record<ColorSchemeName, ThemeTokenMap>;
}

export type ThemeName =
  | "DD-SoftLab"
  | "DD-Water"
  | "DD-Fire"
  | "DD-Metal"
  | "DD-Earth"
  | "DD-Cyberpunk"
  | "DD-Emerald"
  | "DD-Amber";

export type ColorSchemeName = "light" | "dark";

export interface ThemeState {
  theme: ThemeDefinition;
  scheme: ColorSchemeName;
  tokens: ThemeTokenMap;
}

export type ThemeRegistry = Record<string, ThemeDefinition>;
