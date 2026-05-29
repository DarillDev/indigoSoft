import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-kit-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
  styleUrl: './card.component.scss',
})
export class CardComponent {}
