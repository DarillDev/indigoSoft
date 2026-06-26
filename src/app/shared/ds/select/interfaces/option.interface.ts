import { Signal } from '@angular/core';

export interface ISelectOption<T = unknown> {
  value: T;
  selected: Signal<boolean>;
  label: Signal<string>;
  disabled: boolean;
  optionId: string;
}
