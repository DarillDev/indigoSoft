import { booleanAttribute, computed, Directive, ElementRef, inject, input } from '@angular/core';
import { FORM_FIELD_SELECT } from '../config/select.token';
import { SELECT_OPTION } from '../config/option.token';
import { ISelectOption } from '../interfaces/option.interface';
import { IFormFieldSelect } from '../interfaces/select.interface';

let nextOptionId = 0;

@Directive({
  selector: 'ui-kit-option, uiKitOption',
  providers: [{ provide: SELECT_OPTION, useExisting: OptionDirective }],
  host: {
    role: 'option',
    '[attr.id]': 'optionId',
    '[attr.aria-selected]': 'selected()',
    '[attr.aria-disabled]': 'disabled || null',
    '[class.selected]': 'selected()',
    '[class.active]': 'active()',
    '[class.disabled]': 'disabled',
    '(click)': 'handleClick()',
  },
})
export class OptionDirective<T = unknown> implements ISelectOption<T> {
  private readonly select = inject<IFormFieldSelect<T>>(FORM_FIELD_SELECT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  public readonly _value = input.required<T>({ alias: 'value' });
  public readonly disabledInput = input(false, { alias: 'disabled', transform: booleanAttribute });

  public readonly optionId = `ui-kit-option-${nextOptionId++}`;

  public get value(): T {
    return this._value();
  }

  public get disabled(): boolean {
    return this.disabledInput();
  }

  public readonly selected = computed(() => this.select.isSelected(this._value()));
  public readonly active = computed(() => this.select.activeOptionId() === this.optionId);
  public readonly label = computed(() => this.elementRef.nativeElement.textContent?.trim() ?? '');

  protected handleClick(): void {
    if (this.disabled) return;
    this.select.selectOption(this._value());
  }
}
