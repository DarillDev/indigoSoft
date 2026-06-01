import { ERole } from '../enums/role.enum';
import { IAddress } from './address.interface';

export interface IUser {
  id: number;
  name: string;
  email: string;
  age: number | null;
  role: ERole;
  address: IAddress;
}
