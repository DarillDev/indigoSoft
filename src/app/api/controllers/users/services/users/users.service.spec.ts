import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { type MockedObject } from 'vitest';
import { ERole, IUser } from '@shared/models';
import { IUserDto } from '../../dtos/user-dto.interface';
import { UsersApiService } from '../users-api/users-api.service';
import { UsersService } from './users.service';

const DTO: IUserDto = {
  id: 1,
  name: 'John Doe',
  username: 'jdoe',
  email: 'john@example.com',
  address: {
    street: 'Main St',
    suite: 'Apt 1',
    city: 'New York',
    zipcode: '10001',
    geo: { lat: '0', lng: '0' },
  },
  phone: '+1',
  website: 'example.com',
  company: { name: 'Acme', catchPhrase: 'cp', bs: 'bs' },
  age: 30,
  role: ERole.Client,
};

const USER: IUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  address: DTO.address,
  age: 30,
  role: ERole.Client,
};

describe('UsersService', () => {
  let service: UsersService;
  let usersApiService: MockedObject<UsersApiService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersApiService,
          useValue: { getAllUsers: vi.fn(), updateUser: vi.fn() },
        },
      ],
    });

    service = TestBed.inject(UsersService);
    usersApiService = TestBed.inject(UsersApiService) as MockedObject<UsersApiService>;
  });

  describe('getAllUsers()', () => {
    it('should map dto list to domain users', async () => {
      usersApiService.getAllUsers.mockReturnValue(of([DTO]));

      const result = await firstValueFrom(service.getAllUsers());

      expect(result).toEqual([USER]);
      expect(usersApiService.getAllUsers).toHaveBeenCalledTimes(1);
      expect(usersApiService.getAllUsers).toHaveBeenCalledWith();
    });

    it('should return empty list when api returns no users', async () => {
      usersApiService.getAllUsers.mockReturnValue(of([]));

      const result = await firstValueFrom(service.getAllUsers());

      expect(result).toEqual([]);
      expect(usersApiService.getAllUsers).toHaveBeenCalledTimes(1);
      expect(usersApiService.getAllUsers).toHaveBeenCalledWith();
    });
  });

  describe('updateUser()', () => {
    it('should send only editable fields and map response', async () => {
      usersApiService.updateUser.mockReturnValue(of(DTO));

      const result = await firstValueFrom(service.updateUser(USER));

      expect(result).toEqual(USER);
      expect(usersApiService.updateUser).toHaveBeenCalledTimes(1);
      expect(usersApiService.updateUser).toHaveBeenCalledWith(1, {
        email: 'john@example.com',
        name: 'John Doe',
        role: ERole.Client,
        age: 30,
      });
    });
  });
});
