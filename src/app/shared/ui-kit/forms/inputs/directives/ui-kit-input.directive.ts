import { computed, Directive, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { FORM_FIELD_CONTROL_TOKEN, IFormField } from '../../form-field/form-field.token';

@Directive({
  selector: '[uiKitInput]',
  providers: [{ provide: FORM_FIELD_CONTROL_TOKEN, useExisting: UiKitInputDirective }],
  host: {
    '(focus)': 'onFocus()',
    '(blur)':  'onBlur()',
    '(input)': 'onInput($event)',
  },
})
export class UiKitInputDirective implements IFormField {
  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  readonly focused = signal(false);

  private readonly hostValue = signal('');

  private readonly controlEvents = toSignal(
    this.ngControl?.control?.events ?? EMPTY,
    { initialValue: null },
  );

  private readonly status = toSignal(
    this.ngControl?.control?.statusChanges ?? EMPTY,
    { initialValue: (this.ngControl?.control?.status ?? 'VALID') as 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED' },
  );

  readonly disabled = computed(() => this.status() === 'DISABLED');

  readonly invalid = computed(() => {
    if (!this.ngControl?.control) return false;
    this.controlEvents();
    return this.ngControl.control.invalid && this.ngControl.control.touched;
  });

  readonly empty = computed(() => {
    if (this.ngControl?.control) {
      this.controlEvents();
      const v = this.ngControl.control.value;
      return v === null || v === undefined || v === '';
    }
    return !this.hostValue();
  });

  onFocus(): void { this.focused.set(true);  }
  onBlur():  void { this.focused.set(false); }

  onInput(event: Event): void {
    this.hostValue.set((event.target as HTMLInputElement).value);
  }
}
