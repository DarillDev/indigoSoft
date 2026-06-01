import { computed, Directive, inject, input, Signal, signal } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Directive()
export abstract class AControlValueAccessor<T> implements ControlValueAccessor {
  public abstract writeValue(value: T): void;

  protected readonly ngControl = inject(NgControl, { optional: true, self: true });

  protected onChange: (value: T | null) => void = () => {};
  protected onTouched: () => void = () => {};

  public readonly isDisabledInput = input(false, { alias: 'isDisabled' });
  private readonly isDisabledByForm = signal(false);

  public readonly isDisabled = computed(() => this.isDisabledByForm() || this.isDisabledInput());

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
    this.isDisabledByForm.set(isDisabled);
  }
}
