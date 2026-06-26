import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { type MockedObject } from 'vitest';
import { ApiService } from '@api/base';
import { IUserDto } from '../../dtos/user-dto.interface';
import { UsersApiService } from './users-api.service';

const USER_DTO = { id: 1, name: 'John' } as IUserDto;

describe('UsersApiService', () => {
  let service: UsersApiService;
  let api: MockedObject<ApiService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersApiService,
        {
          provide: ApiService,
          useValue: { get: vi.fn(), patch: vi.fn() },
        },
      ],
    });

    service = TestBed.inject(UsersApiService);
    api = TestBed.inject(ApiService) as MockedObject<ApiService>;
  });

  describe('getAllUsers()', () => {
    it('should request users list via api.get', async () => {
      api.get.mockReturnValue(of([USER_DTO]));

      const result = await firstValueFrom(service.getAllUsers());

      expect(result).toEqual([USER_DTO]);
      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith('/users');
    });
  });

  describe('updateUser()', () => {
    it('should patch user by id with given params', async () => {
      const params = { name: 'Jane' };
      api.patch.mockReturnValue(of(USER_DTO));

      const result = await firstValueFrom(service.updateUser(1, params));

      expect(result).toEqual(USER_DTO);
      expect(api.patch).toHaveBeenCalledTimes(1);
      expect(api.patch).toHaveBeenCalledWith('/users/1', params);
    });
  });
});
