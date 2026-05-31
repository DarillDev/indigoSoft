import { ERole } from '@shared';
import { IUserDto } from './user-dto.interface';

export type TUpdateUserParams = Partial<Pick<IUserDto, 'name' | 'email' | 'role'>>;
