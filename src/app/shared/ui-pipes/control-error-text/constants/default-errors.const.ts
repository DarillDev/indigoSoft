import { ValidationErrors } from '@angular/forms';
import { TErrorsTextMap } from '../types/errors-text-map.type';

export const DEFAULT_ERRORS: TErrorsTextMap = new Map<
  string,
  string | ((error: ValidationErrors) => string)
>([
  ['required', 'Поле обязательно для заполнения'],
  ['email', 'Некорректный email'],
  ['minlength', (error) => `Минимум ${error['minlength'].requiredLength} символов`],
  ['maxlength', (error) => `Максимум ${error['maxlength'].requiredLength} символов`],
  ['min', (error) => `Минимальное значение: ${error['min'].min}`],
  ['max', (error) => `Максимальное значение: ${error['max'].max}`],
]);
