import { InjectionToken, Signal } from '@angular/core';

export interface IFormField {
  focused:  Signal<boolean>;
  disabled: Signal<boolean>;
  invalid:  Signal<boolean>;
  empty:    Signal<boolean>;
}

export const FORM_FIELD_CONTROL_TOKEN = new InjectionToken<IFormField>('FORM_FIELD_CONTROL_TOKEN');
