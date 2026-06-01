import { Component, input } from '@angular/core';
import { EIconName } from './enums/icon-name.enum';

@Component({
  selector: 'ds-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  readonly name = input.required<EIconName | `${EIconName}`>();
  readonly size = input<number>(16);
}
