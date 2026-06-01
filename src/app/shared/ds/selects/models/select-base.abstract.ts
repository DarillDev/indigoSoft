import { Directive, input, TemplateRef } from '@angular/core';
import { IDsSelectOption } from '../interfaces/select-option.interface';
import { AControlValueAccessor } from 'src/app/shared/models/control-value-accessor.abstract';
import { TNillable } from '@shared/models';
import { IDsSelectOptionContext } from '../interfaces/select-option-context.interface';

@Directive()
export abstract class ASelectBaseControl<T> extends AControlValueAccessor<T> {
  public readonly label = input<string>();
  public readonly placeholder = input('');
  public readonly hint = input('');
  public readonly error = input<TNillable<string>>(null);
  public readonly options = input<IDsSelectOption<T>[]>([]);
  public readonly optionTemplate = input<TemplateRef<IDsSelectOptionContext<T>> | null>(null);
  public readonly triggerTemplate = input<TemplateRef<IDsSelectOptionContext<T>> | null>(null);
  public readonly compareFn = input<(v1: T, v2: T) => boolean>();
}
