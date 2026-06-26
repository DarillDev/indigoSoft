import { IDsSelectOption } from './select-option.interface';

export interface IDsSelectOptionContext<T = unknown> {
  $implicit: IDsSelectOption<T> | null;
}
