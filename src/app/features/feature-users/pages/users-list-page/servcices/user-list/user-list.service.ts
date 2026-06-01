import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { UsersService } from '@api/controllers/users';
import { IUser } from '@shared/models';
import { catchError, defer, finalize, Observable, throwError } from 'rxjs';

@Injectable()
export class UsersListService {
  private readonly usersService = inject(UsersService);

  private readonly userListResource = rxResource({
    stream: () => this.usersService.getAllUsers(),
    defaultValue: [],
  });

  public readonly users = this.userListResource.value;
  public readonly isLoading = this.userListResource.isLoading;

  private updateResource(updatedUser: IUser): void {
    this.users.update((users) =>
      (users ?? []).map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
  }

  public updateUser(updatedUser: IUser, isOptimistic: boolean = true): Observable<IUser> {
    let request$ = this.usersService.updateUser(updatedUser);

    if (!isOptimistic) {
      return request$.pipe(finalize(() => this.userListResource.reload()));
    }

    return defer(() => {
      this.updateResource(updatedUser);

      return request$.pipe(
        catchError((error) => {
          this.userListResource.reload();

          return throwError(() => error);
        }),
      );
    });
  }
}
