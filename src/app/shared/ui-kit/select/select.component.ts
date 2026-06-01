import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Signal,
  ViewEncapsulation,
  computed,
  contentChild,
  contentChildren,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { FORM_FIELD_CONTROL } from '@shared/ui-kit/form-field';

import { AControlValueAccessor } from '../../models/control-value-accessor.abstract';
import { SELECT_OPTION } from './config/option.token';
import { SELECT_TRIGGER } from './config/select-trigger.token';
import { FORM_FIELD_SELECT } from './config/select.token';
import { ISelectOption } from './interfaces/option.interface';
import { IFormFieldSelect } from './interfaces/select.interface';
let nextSelectId = 0;

@Component({
  selector: 'ui-kit-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  imports: [OverlayModule],
  providers: [
    { provide: FORM_FIELD_SELECT, useExisting: SelectComponent },
    { provide: FORM_FIELD_CONTROL, useExisting: SelectComponent },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent<T> extends AControlValueAccessor<T> implements IFormFieldSelect<T> {
  public readonly value = model<T | null>(null);

  private readonly elementRef = inject(ElementRef<HTMLElement>);

  protected readonly options = contentChildren<ISelectOption<T>>(SELECT_OPTION);
  protected readonly triggerRef = viewChild<ElementRef<HTMLButtonElement>>('triggerBtn');
  protected readonly customTrigger = contentChild(SELECT_TRIGGER);

  protected readonly isOpen = signal(false);
  protected readonly describedBy = signal('');

  public readonly activeOptionId: Signal<string | null> = signal(null);

  public readonly id = input(`ui-kit-select-${nextSelectId++}`);
  public readonly compareFn = input<(v1: T, v2: T) => boolean>();
  public readonly placeholder = input('');
  public readonly overlayOrigin = input<HTMLElement | string>();

  protected resolvedOverlayOrigin = computed(() => {
    const origin = this.overlayOrigin();

    if (typeof origin === 'string') {
      return (
        (this.elementRef.nativeElement.closest(origin) as HTMLElement | null) ??
        this.elementRef.nativeElement
      );
    }

    return origin ?? this.elementRef.nativeElement;
  });

  public readonly isEmpty = computed(() => {
    const value = this.value();

    return value === null || value === undefined;
  });

  public readonly hasError = computed(() => {
    const control = this.ngControl?.control;
    return !!control?.invalid && (!!control.touched || !!control.dirty);
  });

  protected readonly selectedLabel = computed(() => {
    return (
      this.options()
        .find((option) => option.selected())
        ?.label() ?? null
    );
  });

  protected readonly overlayPositions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
  ];

  public override writeValue(value: T): void {
    this.value.set(value ?? null);
  }

  public isSelected(value: T): boolean {
    const selected = this.value();

    if (selected === null || selected === undefined) {
      return false;
    }

    const compare = this.compareFn();

    return compare ? compare(selected, value) : selected === value;
  }

  public selectOption(value: T): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
    this.isOpen.set(false);
  }

  public onContainerClick(): void {
    this.isOpen.set(true);
  }

  public setDescribedByIds(ids: string[]): void {
    this.describedBy.set(ids.join(' '));
  }

  protected toggle(event: MouseEvent): void {
    event.stopPropagation();

    this.isOpen.update((v) => !v);
  }
}
