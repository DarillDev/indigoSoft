import { InjectionToken } from '@angular/core';
import { TErrorsTextMap } from '../types/errors-text-map.type';

export const CONTROL_ERRORS = new InjectionToken<TErrorsTextMap>('CONTROL_ERRORS');
