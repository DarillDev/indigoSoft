import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { AControlValueAccessor } from '../base/control-value-accessor.abstract';

export interface SelectOption<T = unknown> {
  value: T;
  label: string;
}

@Component({
  selector: 'ui-kit-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends AControlValueAccessor<unknown> {
  protected readonly value = signal<unknown>(null);

  public override writeValue(value: unknown): void {
    this.value.set(value ?? null);
  }

  public readonly label = input<string>();
  public readonly placeholder = input('');
  public readonly options = input<SelectOption[]>([]);

  protected handleChange(event: Event): void {
    const selectEl = event.target as HTMLSelectElement;
    const option = this.options()[selectEl.selectedIndex - 1];
    const value = option?.value ?? null;

    this.value.set(value);
    this.onChange(value);
  }

  protected handleBlur(): void {
    this.onTouched();
  }

  protected isSelected(optionValue: unknown): boolean {
    return this.value() === optionValue;
  }
}
