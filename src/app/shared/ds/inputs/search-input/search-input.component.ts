import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { AInputBaseControl } from '../models/input-base/input-base.abstract';
import { FormFieldComponent, PrefixDirective } from '@shared/ui-kit/form-field';
import { InputDirective } from '@shared/ui-kit/input';
import { IconComponent } from '@shared/ds/icon';

let dsSearchInputNextId = 0;

@Component({
  selector: 'ds-search-input',
  imports: [FormFieldComponent, PrefixDirective, InputDirective, IconComponent],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent extends AInputBaseControl<string> {
  protected readonly value = signal('');

  public readonly id = input(`ds-search-input-${dsSearchInputNextId++}`);

  public writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  public onValueChange(event: Event): void {
    this.onChange?.((event.target as HTMLInputElement).value);
    this.onTouched();
  }
}
