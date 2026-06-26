# ds-modal

Модальные окна поверх `@angular/cdk/dialog`. Два элемента:

- `ModalService` — обёртка над `Dialog`: открывает компонент, возвращает результат закрытия как `Observable`.
- `ModalContainerComponent` (`ds-modal-container`) — оболочка диалога: шапка (заголовок + кнопка-крестик) и слот тела. Используется как корень шаблона компонента-диалога.

Требование: в корневых провайдерах подключён `provideDialog()`.

## Импорт

```ts
import { ModalService, ModalContainerComponent } from '@shared/ds/modal';
```

## Открытие диалога — `ModalService`

```ts
import { inject } from '@angular/core';
import { ModalService } from '@shared/ds/modal';
import { EditUserDialogComponent } from './edit-user-dialog.component';

export class UsersListComponent {
  private readonly modal = inject(ModalService);

  protected edit(user: IUser): void {
    this.modal
      .open<IUser, IUser>(EditUserDialogComponent, user)
      .subscribe((result) => {
        // result: IUser при close(value); undefined при закрытии крестиком / по бэкдропу
        if (result) {
          /* применить result */
        }
      });
  }
}
```

### `open<TResult, TData>(component, data?)`

| Параметр    | Тип                     | Описание                                          |
| ----------- | ----------------------- | ------------------------------------------------- |
| `component` | `ComponentType<unknown>`| Компонент-диалог для рендера в оверлее.            |
| `data`      | `TData` (опц.)          | Данные, доступные внутри через `DIALOG_DATA`.      |
| **возврат** | `Observable<TResult \| undefined>` | Поток `closed`: значение из `dialogRef.close(value)` либо `undefined` при закрытии без результата. |

Дженерики: `TResult` — тип результата (что передаётся в `dialogRef.close(...)`), `TData` — тип входных данных.

## Оболочка диалога — `ds-modal-container`

Корень шаблона компонента-диалога. Рендерит шапку (заголовок + крестик) и проецирует тело в дефолтный слот. Крестик вызывает `DialogRef.close()`.

```ts
import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ModalContainerComponent } from '@shared/ds/modal';

@Component({
  selector: 'feature-edit-user-dialog',
  imports: [ModalContainerComponent /* …формы */],
  templateUrl: './edit-user-dialog.component.html',
})
export class EditUserDialogComponent {
  private readonly data = inject<IUser>(DIALOG_DATA);
  private readonly dialogRef = inject(DialogRef<IUser>);

  protected save(): void {
    this.dialogRef.close(this.form.getRawValue());
  }
}
```

```html
<!-- edit-user-dialog.component.html -->
<ds-modal-container title="Редактирование пользователя">
  <form (ngSubmit)="save()">
    <!-- поля формы -->
  </form>
</ds-modal-container>
```

### `<ds-modal-container>`

Селектор: `ds-modal-container`.

| Input   | Тип      | По умолчанию | Описание                  |
| ------- | -------- | ------------ | ------------------------- |
| `title` | `string` | — (required) | Заголовок в шапке.        |

## Публичный API

| Имя                      | Вид       | Описание                              |
| ------------------------ | --------- | ------------------------------------- |
| `ModalService`           | сервис    | `open(component, data?)` → `Observable`|
| `ModalContainerComponent`| компонент | селектор `ds-modal-container`          |
