import { ERole } from '@shared/models';
import { IUserDto } from './user-dto.interface';

export type TUpdateUserParams = Partial<Pick<IUserDto, 'name' | 'email' | 'role'>>;
