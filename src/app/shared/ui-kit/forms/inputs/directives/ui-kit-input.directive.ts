import { computed, Directive, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { FORM_FIELD_TOKEN, IFormField } from '../../form-field/form-field.token';

@Directive({
  selector: '[uiKitInput]',
  host: {
    '(focus)': 'onFocus()',
    '(blur)':  'onBlur()',
    '(input)': 'onInput($event)',
  },
})
export class UiKitInputDirective implements IFormField, OnInit, OnDestroy {
  private readonly formField = inject(FORM_FIELD_TOKEN, { optional: true });
  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  readonly focused = signal(false);

  private readonly hostValue = signal('');

  // toSignal must be called in the injection context (constructor/field initializer).
  // With [formControl], ngControl.control is set during FormControlDirective.ngOnInit,
  // which runs before this directive's ngOnInit. However, field initializers run before
  // any ngOnInit, so ngControl.control may be null here.
  // We use the ngControl observable directly; if control is not yet available, fall back to EMPTY.
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

  ngOnInit():    void { this.formField?.registerControl(this);   }
  ngOnDestroy(): void { this.formField?.unregisterControl();     }
}
