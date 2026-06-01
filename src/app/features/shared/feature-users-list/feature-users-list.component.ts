import { ChangeDetectionStrategy, Component, input, TemplateRef } from '@angular/core';
import { IUser } from '@shared/models';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'feature-users-list',
  imports: [CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf, NgTemplateOutlet],
  templateUrl: './feature-users-list.component.html',
  styleUrl: './feature-users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  public readonly itemTemplate = input<TemplateRef<IUser> | null>(null);
  public readonly itemSizeInPx = input('50');
  public readonly users = input<IUser[]>([]);
  public readonly isLoading = input(false);
  public readonly hasFilter = input(false);

  protected asUser<T>(item: T): IUser {
    return item as IUser;
  }
}
