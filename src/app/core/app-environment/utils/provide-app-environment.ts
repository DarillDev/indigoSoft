import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { AppEnvironment } from '../models/app-environment';

export const provideAppEnvironment = (env: AppEnvironment): EnvironmentProviders =>
  makeEnvironmentProviders([{ provide: AppEnvironment, useValue: env }]);
