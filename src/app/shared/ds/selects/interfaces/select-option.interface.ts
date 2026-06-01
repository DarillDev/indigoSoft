export interface IDsSelectOption<T = unknown> {
  id: string | number;
  value: T;
  label: string;
}

export interface IDsSelectOptionContext<T = unknown> {
  $implicit: IDsSelectOption<T> | null;
}
