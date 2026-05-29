import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { IApiConfig } from './api-config.interface';
import { API_CONFIG } from './api-config.token';

export function provideApiConfig(config: IApiConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: API_CONFIG, useValue: config }]);
}
