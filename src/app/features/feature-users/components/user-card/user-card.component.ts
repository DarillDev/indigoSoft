import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { IUser } from '@shared/models';
import { CardComponent } from '@shared/ds/card';

const AVATAR_COLORS = ['indigo', 'emerald', 'amber', 'rose', 'violet', 'teal'] as const;

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

  protected readonly avatarColor = computed(
    () => AVATAR_COLORS[this.user().name.charCodeAt(0) % AVATAR_COLORS.length],
  );
}
