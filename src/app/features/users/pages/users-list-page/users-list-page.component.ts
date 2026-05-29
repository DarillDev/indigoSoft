import { Component, inject } from '@angular/core';
import { UsersService } from '@api/controllers/users';

@Component({
  selector: 'app-users-list-page',
  imports: [],
  template: '<p>Users list page</p>',
})
export class UsersListPageComponent {
  private readonly usersService = inject(UsersService);
}
