import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FORM_FIELD_TOKEN, FormFieldApi, IFormField } from './form-field.token';

@Component({
  selector: 'ui-kit-form-field',
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: FORM_FIELD_TOKEN, useExisting: FormFieldComponent }],
  host: {
    '[class.ff--auto]':         'floatLabel() === "auto"',
    '[class.ff--float-active]': 'floatActive()',
  },
})
export class FormFieldComponent implements FormFieldApi {
  readonly floatLabel = input<'always' | 'auto'>('always');

  private readonly control = signal<IFormField | null>(null);

  protected readonly focused  = computed(() => this.control()?.focused()  ?? false);
  protected readonly disabled = computed(() => this.control()?.disabled() ?? false);
  protected readonly invalid  = computed(() => this.control()?.invalid()  ?? false);
  private   readonly empty    = computed(() => this.control()?.empty()    ?? true);

  protected readonly floatActive = computed(
    () => this.floatLabel() === 'auto' && (!this.empty() || this.focused()),
  );

  registerControl(control: IFormField): void   { this.control.set(control); }
  unregisterControl():                  void   { this.control.set(null);    }
}
