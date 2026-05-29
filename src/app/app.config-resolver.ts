import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { AppEnvironment, provideAppEnvironment } from '@core';
import { routes } from './app.routes';
import { provideApiConfig } from '@api/config';

export const appConfigResolver = (appEnvironment: AppEnvironment): ApplicationConfig => {
  const { apiUrl } = appEnvironment;

  return {
    providers: [
      provideAppEnvironment(appEnvironment),
      provideApiConfig({ baseUrl: apiUrl }),
      provideBrowserGlobalErrorListeners(),
      provideZonelessChangeDetection(),
      provideRouter(routes),
    ],
  };
};
