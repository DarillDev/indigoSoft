import { inject, signal } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

export abstract class AControlValueAccessor<T = string> implements ControlValueAccessor {
  public abstract writeValue(value: T): void;

  protected readonly ngControl = inject(NgControl, { optional: true, self: true });
  protected readonly isDisabled = signal(false);

  protected onChange: (value: T | null) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
