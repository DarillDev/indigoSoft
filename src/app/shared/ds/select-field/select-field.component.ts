import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  computed,
  input,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TNillable } from '@shared/models';
import {
  ErrorDirective,
  FormFieldComponent,
  HintDirective,
  LabelDirective,
} from '@shared/ui-kit/form-field';
import { OptionDirective, SelectComponent, SelectTriggerDirective } from '@shared/ui-kit/select';
import { ControlErrorTextPipe } from '@shared/ui-pipes/control-error-text';
import { AControlValueAccessor } from '../../models/control-value-accessor.abstract';
import { IDsSelectOption, IDsSelectOptionContext } from './select-option.interface';

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
export class SelectFieldComponent<T = unknown> extends AControlValueAccessor<T> {
  protected readonly value = signal<T | null>(null);

  public readonly id = input(`ds-select-field-${uiKitSelectFieldNextId++}`);
  public readonly label = input<string>();
  public readonly placeholder = input('');
  public readonly hint = input('');
  public readonly error = input<TNillable<string>>(null);
  public readonly options = input<IDsSelectOption<T>[]>([]);
  public readonly optionTemplate = input<TemplateRef<IDsSelectOptionContext<T>> | null>(null);
  public readonly triggerTemplate = input<TemplateRef<IDsSelectOptionContext<T>> | null>(null);
  public readonly compareFn = input<(v1: T, v2: T) => boolean>();

  protected readonly selectedOption = computed(() => {
    const val = this.value();
    if (val === null || val === undefined) return null;
    const cmp = this.compareFn();
    return this.options().find((o) => (cmp ? cmp(o.value, val) : o.value === val)) ?? null;
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
