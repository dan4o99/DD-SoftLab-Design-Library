import { InjectionToken } from "@angular/core";
import { ColorSchemeName, ThemeName } from "./theme-types";

export interface DdSoftlabDesignConfig {
  theme?: ThemeName;
  scheme?: ColorSchemeName;
}

export const DD_SOFTLAB_DESIGN_CONFIG =
  new InjectionToken<DdSoftlabDesignConfig>("DD_SOFTLAB_DESIGN_CONFIG");
