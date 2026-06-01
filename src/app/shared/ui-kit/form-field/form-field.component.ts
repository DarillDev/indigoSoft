import { Component, computed, contentChild, contentChildren, effect, input } from '@angular/core';
import { ErrorDirective } from './directives/error/error.directive';
import { HintDirective } from './directives/hint/hint.directive';
import { PrefixDirective } from './directives/prefix/prefix.directive';
import { SuffixDirective } from './directives/suffix/suffix.directive';
import { FORM_FIELD_CONTROL } from './config/form-field-control.token';

@Component({
  selector: 'ui-kit-form-field',
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  exportAs: 'formField',
  host: {
    '[class.ui-kit-form-field--auto]': 'floatLabel() === "auto"',
    '[class.ui-kit-form-field--float-active]': 'isFloatActive()',
  },
})
export class FormFieldComponent {
  public readonly floatLabel = input<'always' | 'auto'>('always');

  private readonly formField = contentChild(FORM_FIELD_CONTROL);
  private readonly errors = contentChildren(ErrorDirective);
  private readonly hints = contentChildren(HintDirective);

  private readonly prefix = contentChild(PrefixDirective);
  private readonly suffix = contentChild(SuffixDirective);

  protected readonly isDisabled = computed(() => this.formField()?.isDisabled() ?? false);
  protected readonly isEmpty = computed(() => this.formField()?.isEmpty() ?? true);
  protected readonly hasPrefix = computed(() => !!this.prefix());
  protected readonly hasSuffix = computed(() => !!this.suffix());
  protected readonly hasHint = computed(() => this.hints().length > 0);
  protected readonly hasError = computed(() => this.errors().length > 0);

  protected readonly isFloatActive = computed(() => {
    const isAlwaysFloatLabel = this.floatLabel() === 'always';
    const isNotEmpty = this.isEmpty();

    return isAlwaysFloatLabel || isNotEmpty;
  });

  constructor() {
    effect(() => {
      const control = this.formField();
      const hintsIds = this.hints().map((h) => h.id);
      const errorsIds = this.errors().map((e) => e.id);

      if (!control) {
        return;
      }

      const ids = [...hintsIds, ...errorsIds];

      control.setDescribedByIds(ids);
    });
  }

  protected onWrapperClick(event: MouseEvent): void {
    this.formField()?.onContainerClick(event);
  }
}
