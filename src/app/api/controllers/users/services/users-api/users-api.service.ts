import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@api/base';
import { IUserDto } from '../../dtos/user-dto.interface';
import { TUpdateUserParams } from '../../dtos/update-user-dto.type';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly api = inject(ApiService);

  public getAllUsers(): Observable<IUserDto[]> {
    return this.api.get('/users');
  }

  public updateUser(id: number, user: TUpdateUserParams): Observable<IUserDto> {
    return this.api.patch(`/users/${id}`, user);
  }
}
