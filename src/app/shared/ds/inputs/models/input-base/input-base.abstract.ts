import { Directive, input } from '@angular/core';
import { TNillable } from '@shared/models';
import { AControlValueAccessor } from 'src/app/shared/models/control-value-accessor.abstract';

@Directive()
export abstract class AInputBaseControl<T> extends AControlValueAccessor<T> {
  public readonly label = input<string>();
  public readonly placeholder = input('');
  public readonly type = input<'text' | 'email' | 'password' | 'number'>('text');
  public readonly hint = input('');
  public readonly error = input<TNillable<string>>(null);

  public onBlur(): void {
    this.onTouched();
  }
}
