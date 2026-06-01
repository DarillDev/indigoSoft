import { Signal } from '@angular/core';
import { IFormFieldControl } from '@shared/ui-kit/form-field';

export interface IFormFieldSelect<T = unknown> extends IFormFieldControl {
  isSelected(value: T): boolean;
  selectOption(value: T): void;
  readonly activeOptionId: Signal<string | null>;
}
