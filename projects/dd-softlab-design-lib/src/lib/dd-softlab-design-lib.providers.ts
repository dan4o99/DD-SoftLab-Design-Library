import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
} from "@angular/core";
import {
  DD_SOFTLAB_DESIGN_CONFIG,
  DdSoftlabDesignConfig,
} from "./theming/theme-config";
import { DdThemeService } from "./theming/theme.service";

export function provideDDSoftlabDesign(
  config: DdSoftlabDesignConfig = {},
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: DD_SOFTLAB_DESIGN_CONFIG,
      useValue: config,
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useFactory: () => {
        const themeService = inject(DdThemeService);
        const resolvedConfig = inject(DD_SOFTLAB_DESIGN_CONFIG, {
          optional: true,
        });

        return () => {
          const themeName = resolvedConfig?.theme ?? "DD-SoftLab";
          const scheme = resolvedConfig?.scheme ?? "light";
          themeService.setTheme(themeName, scheme);
        };
      },
    },
  ]);
}
