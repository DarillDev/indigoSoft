import { ChangeDetectionStrategy, Component, computed, contentChild, input } from '@angular/core';
import { FORM_FIELD_CONTROL_TOKEN } from './form-field.token';

@Component({
  selector: 'ui-kit-form-field',
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ff--auto]':         'floatLabel() === "auto"',
    '[class.ff--float-active]': 'floatActive()',
  },
})
export class FormFieldComponent {
  readonly floatLabel = input<'always' | 'auto'>('always');

  private readonly control = contentChild(FORM_FIELD_CONTROL_TOKEN);

  protected readonly focused  = computed(() => this.control()?.focused()  ?? false);
  protected readonly disabled = computed(() => this.control()?.disabled() ?? false);
  protected readonly invalid  = computed(() => this.control()?.invalid()  ?? false);
  private   readonly empty    = computed(() => this.control()?.empty()    ?? true);

  protected readonly floatActive = computed(
    () => this.floatLabel() === 'auto' && (!this.empty() || this.focused()),
  );
}
