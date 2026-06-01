import {
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
  TrackByFunction,
} from '@angular/core';
import { IUser } from '@shared/models';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { NgTemplateOutlet } from '@angular/common';
import { CardComponent } from '@shared/ds/card';

@Component({
  selector: 'feature-users-list',
  imports: [
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    NgTemplateOutlet,
    CardComponent,
  ],
  templateUrl: './feature-users-list.component.html',
  styleUrl: './feature-users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  protected readonly trackById: TrackByFunction<IUser> = (_, user) => user.id;

  public readonly itemTemplate = input<TemplateRef<IUser> | null>(null);
  public readonly itemSizeInPx = input<number>(50);
  public readonly users = input<IUser[]>([]);
  public readonly isLoading = input(false);
  public readonly hasFilter = input(false);
}
