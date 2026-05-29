import { ERole } from '@shared';

export interface IUserDto {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };

  // Эти поля добавил для примера, но их нет в jsonplaceholder
  age?: number;
  role?: ERole;
}
