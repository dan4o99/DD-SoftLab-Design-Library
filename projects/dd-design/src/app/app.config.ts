import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideDDSoftlabDesign } from '@dd-softlab/dd-softlab-design-lib';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideDDSoftlabDesign({
      theme: 'DD-SoftLab',
    }),
  ],
};
