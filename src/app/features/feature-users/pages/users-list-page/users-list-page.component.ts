import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { UsersService } from '@api/controllers/users';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '@shared/ds/modal';
import { IUser } from '@shared/models';
import { debounceTime, filter, Observable, switchMap, take, tap } from 'rxjs';
import { EditUserDialogComponent } from '../../components/edit-user-dialog/edit-user-dialog.component';
import { createDestroyer } from '@shared/utils';
import { UsersListComponent } from 'src/app/features/shared/feature-users-list/feature-users-list.component';
import { SearchInputComponent } from '@shared/ds/inputs/search-input';

@Component({
  selector: 'feature-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserCardComponent, ReactiveFormsModule, UsersListComponent, SearchInputComponent],
})
export class UsersListPageComponent {
  private readonly usersService = inject(UsersService);
  private readonly modalService = inject(ModalService);
  private readonly destroyer = createDestroyer();

  protected readonly searchControl = new FormControl<string>('', { nonNullable: true });

  private readonly userList = rxResource({
    stream: () => this.usersService.getAllUsers(),
    defaultValue: [],
  });

  private readonly searchQuery = toSignal(this.searchControl.valueChanges.pipe(debounceTime(200)), {
    initialValue: '',
  });

  protected readonly hasFilter = computed(() => !!this.searchQuery());
  protected readonly isLoading = this.userList.isLoading;
  protected readonly filteredUsers = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const users = this.userList.value();

    return query ? users.filter((user) => user.name.toLowerCase().includes(query)) : users;
  });

  private openEditDialog(user: IUser): Observable<IUser | undefined> {
    return this.modalService.open<IUser, IUser>(EditUserDialogComponent, user);
  }

  protected editUser(user: IUser): void {
    const promptEditUser$ = this.openEditDialog(user);
    const editData$ = promptEditUser$.pipe(take(1), filter(Boolean));

    editData$
      .pipe(
        tap((editedUser) => {
          this.userList.value.update((users) =>
            (users ?? []).map((u) => (u.id === editedUser.id ? editedUser : u)),
          );
        }),
        switchMap((editData) => this.usersService.updateUser(editData)),
        this.destroyer(),
      )
      .subscribe({
        error: () => {
          this.userList.reload();
        },
      });
  }
}
