import { InjectionToken, Signal } from '@angular/core';

export interface IFormField {
  focused:  Signal<boolean>;
  disabled: Signal<boolean>;
  invalid:  Signal<boolean>;
  empty:    Signal<boolean>;
}

export interface FormFieldApi {
  registerControl(control: IFormField): void;
  unregisterControl(): void;
}

export const FORM_FIELD_TOKEN = new InjectionToken<FormFieldApi>('FORM_FIELD_TOKEN');
