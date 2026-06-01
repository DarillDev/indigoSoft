import { inject, Injectable } from '@angular/core';
import { UsersApiService } from '../users-api/users-api.service';
import { IUser } from '@shared/models';
import { map, Observable } from 'rxjs';
import { UserMapper } from '../../mappers/user-mapper/user.mapper';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly usersApiService = inject(UsersApiService);

  public getAllUsers(): Observable<IUser[]> {
    return this.usersApiService
      .getAllUsers()
      .pipe(map((usersDto) => usersDto.map(UserMapper.fromDto)));
  }

  public updateUser(user: IUser): Observable<IUser> {
    const { id, email, name, role, age } = user;

    return this.usersApiService
      .updateUser(id, { email, name, role, age })
      .pipe(map(UserMapper.fromDto));
  }
}
