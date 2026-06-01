import { FormControl } from '@angular/forms';
import { ERole } from '@shared/models';

export interface IUserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  age: FormControl<number | null>;
  role: FormControl<ERole>;
}
