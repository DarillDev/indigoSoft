import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { AControlValueAccessor } from '../base/control-value-accessor.abstract';

@Component({
  selector: 'ui-kit-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends AControlValueAccessor<string> {
  protected readonly value = signal('');

  public readonly label = input<string>();
  public readonly placeholder = input('');
  public readonly type = input<'text' | 'email' | 'password' | 'number'>('text');

  public writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  protected handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.value.set(value);
    this.onChange(value);
  }

  protected handleBlur(): void {
    this.onTouched();
  }
}
