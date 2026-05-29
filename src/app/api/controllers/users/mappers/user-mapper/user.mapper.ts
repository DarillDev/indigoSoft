import { ERole, IUser } from '@shared';
import { IUserDto } from '../../dtos/user-dto.interface';

export class UserMapper {
  public static fromDto(dto: IUserDto): IUser {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      address: dto.address,
      age: dto.age ?? null,
      role: dto.role ?? ERole.UnknownUser,
    };
  }
}
