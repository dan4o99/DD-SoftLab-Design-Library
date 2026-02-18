import { DOCUMENT } from "@angular/common";
import {
  Inject,
  Injectable,
  Optional,
  signal,
  WritableSignal,
} from "@angular/core";
import {
  DD_SOFTLAB_DESIGN_CONFIG,
  DdSoftlabDesignConfig,
} from "./theme-config";
import { DD_THEMES } from "./themes";
import {
  applyCssVariables,
  resolveThemeTokens,
  themeTokensToCssVariables,
} from "./theme-utils";
import {
  ColorSchemeName,
  ThemeDefinition,
  ThemeName,
  ThemeRegistry,
  ThemeState,
} from "./theme-types";

@Injectable({
  providedIn: "root",
})
export class DdThemeService {
  private readonly themes: ThemeRegistry = DD_THEMES;
  private readonly themeSignal: WritableSignal<ThemeState> = signal(
    this.createThemeState("DD-SoftLab", "light"),
  );

  readonly activeTheme = this.themeSignal.asReadonly();

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Optional()
    @Inject(DD_SOFTLAB_DESIGN_CONFIG)
    config?: DdSoftlabDesignConfig,
  ) {
    const initialTheme = config?.theme ?? "DD-SoftLab";
    const initialScheme = config?.scheme ?? "light";
    this.setTheme(initialTheme, initialScheme);
  }

  listThemes(): ThemeDefinition[] {
    return Object.values(this.themes);
  }

  listSchemes(): ColorSchemeName[] {
    return ["light", "dark"];
  }

  setTheme(
    themeName: ThemeName,
    scheme: ColorSchemeName = this.activeTheme().scheme,
  ): void {
    const theme = this.themes[themeName];

    if (!theme) {
      return;
    }

    this.applyTheme(theme, scheme);
  }

  setScheme(scheme: ColorSchemeName): void {
    this.applyTheme(this.activeTheme().theme, scheme);
  }

  private createThemeState(
    themeName: ThemeName,
    scheme: ColorSchemeName,
  ): ThemeState {
    const theme = this.themes[themeName];

    if (!theme) {
      const fallback = this.themes["DD-SoftLab"];
      return {
        theme: fallback,
        scheme: "light",
        tokens: resolveThemeTokens(fallback, "light"),
      };
    }

    return {
      theme,
      scheme,
      tokens: resolveThemeTokens(theme, scheme),
    };
  }

  private applyTheme(theme: ThemeDefinition, scheme: ColorSchemeName): void {
    const root = this.document.documentElement;
    const mergedTokens = resolveThemeTokens(theme, scheme);
    const cssVariables = themeTokensToCssVariables(mergedTokens);
    applyCssVariables(cssVariables, root);
    root.setAttribute("data-dd-theme", theme.name);
    root.setAttribute("data-dd-scheme", scheme);
    this.themeSignal.set({ theme, scheme, tokens: mergedTokens });
  }
}
