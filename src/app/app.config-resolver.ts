import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { AppEnvironment, provideAppEnvironment } from '@core';
import { routes } from './app.routes';

export const appConfigResolver = (appEnvironment: AppEnvironment): ApplicationConfig => ({
  providers: [
    provideAppEnvironment(appEnvironment),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
  ],
});
