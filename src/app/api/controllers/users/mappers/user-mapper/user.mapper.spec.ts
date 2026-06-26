import { ERole, IUser } from '@shared/models';
import { IUserDto } from '../../dtos/user-dto.interface';
import { UserMapper } from './user.mapper';

const DTO_BASE: IUserDto = {
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

describe('UserMapper', () => {
  describe('fromDto()', () => {
    it('should map dto fields to domain user', () => {
      const result = UserMapper.fromDto(DTO_BASE);

      expect(result).toEqual<IUser>({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        address: DTO_BASE.address,
        age: 30,
        role: ERole.Client,
      });
    });

    it('should fall back age to null when missing', () => {
      const result = UserMapper.fromDto({ ...DTO_BASE, age: undefined });

      expect(result.age).toBeNull();
    });

    it('should fall back age to null when explicitly null', () => {
      const result = UserMapper.fromDto({ ...DTO_BASE, age: null });

      expect(result.age).toBeNull();
    });

    it('should fall back role to UnknownUser when missing', () => {
      const result = UserMapper.fromDto({ ...DTO_BASE, role: undefined });

      expect(result.role).toBe(ERole.UnknownUser);
    });
  });
});
