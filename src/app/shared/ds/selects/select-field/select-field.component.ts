import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  computed,
  input,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  ErrorDirective,
  FormFieldComponent,
  HintDirective,
  LabelDirective,
} from '@shared/ui-kit/form-field';
import { OptionDirective, SelectComponent, SelectTriggerDirective } from '@shared/ui-kit/select';
import { ControlErrorTextPipe } from '@shared/ui-pipes/control-error-text';
import { ASelectBaseControl } from '../models/select-base.abstract';

let uiKitSelectFieldNextId = 0;

@Component({
  selector: 'ds-select-field',
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormFieldComponent,
    LabelDirective,
    SelectComponent,
    HintDirective,
    ErrorDirective,
    ControlErrorTextPipe,
    NgTemplateOutlet,
    SelectTriggerDirective,
    OptionDirective,
  ],
})
export class SelectFieldComponent<T = unknown> extends ASelectBaseControl<T> {
  protected readonly value = signal<T | null>(null);

  public readonly id = input(`ds-select-field-${uiKitSelectFieldNextId++}`);

  protected readonly selectedOption = computed(() => {
    const value = this.value();
    if (value === null || value === undefined) {
      return null;
    }

    const compareFn = this.compareFn();

    return (
      this.options().find((option) =>
        compareFn ? compareFn(option.value, value) : option.value === value,
      ) ?? null
    );
  });

  public writeValue(value: T | null): void {
    this.value.set(value ?? null);
  }

  protected handleChange(value: T | null): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }
}
