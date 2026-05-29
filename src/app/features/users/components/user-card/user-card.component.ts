import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IUser } from '@shared';
import { CardComponent } from '@ui-kit/card';

@Component({
  selector: 'feature-user-card',
  imports: [CardComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  public readonly user = input.required<IUser>();

  public readonly onEditButtonClick = output<void>();
}
