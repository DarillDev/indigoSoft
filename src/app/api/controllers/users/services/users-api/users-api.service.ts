import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@api/base';
import { IUserDto } from '../../dtos/user-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly api = inject(ApiService);

  public getAllUsers(): Observable<IUserDto[]> {
    return this.api.get('/users');
  }
}
