import { InjectionToken } from '@angular/core';
import { IApiConfig } from './api-config.interface';

export const API_CONFIG = new InjectionToken<IApiConfig>('api config');
