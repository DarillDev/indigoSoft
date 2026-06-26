# ds-select

Кастомный select без сторонних UI-зависимостей (использует только `@angular/cdk/overlay`).  
Реализует `ControlValueAccessor` — работает с `formControlName` / `[formControl]`.  
Совместим с `ds-form-field` через токен `FORM_FIELD_CONTROL`.

## Использование

```html
<ds-form-field>
  <ds-label>Роль</ds-label>

  <ds-select [formControl]="roleCtrl" placeholder="Выберите роль">
    <ds-option value="admin">Admin</ds-option>
    <ds-option value="user">User</ds-option>
    <ds-option value="guest" disabled>Guest</ds-option>
  </ds-select>

  <ds-error>{{ roleCtrl | controlErrorText }}</ds-error>
</ds-form-field>
```

### Кастомный trigger

```html
<ds-select [formControl]="ctrl">
  <ng-template dsSelectTrigger>
    <app-icon [name]="selectedIcon()" /> {{ selectedLabel() }}
  </ng-template>
  <ds-option [value]="item" *ngFor="let item of items">{{ item.label }}</ds-option>
</ds-select>
```

## Inputs

| Input          | Тип                          | По умолчанию | Описание                                           |
|----------------|------------------------------|--------------|----------------------------------------------------|
| `placeholder`  | `string`                     | `''`         | Текст когда ничего не выбрано                      |
| `isDisabled`   | `boolean`                    | `false`      | Отключить вручную (без формы)                      |
| `compareFn`    | `(v1: T, v2: T) => boolean`  | —            | Кастомная функция сравнения значений               |
| `overlayOrigin`| `HTMLElement \| string`      | —            | Якорь для overlay (CSS-селектор или элемент)       |
| `id`           | `string`                     | авто         | id триггера (генерируется автоматически)            |

## Директивы

| Директива / элемент              | Описание                                        |
|----------------------------------|-------------------------------------------------|
| `ds-option [value]`          | Опция списка; поддерживает атрибут `disabled`   |
| `[dsSelectTrigger]`           | Кастомное содержимое кнопки-триггера            |

## Как работает

- Панель опций открывается через `cdkConnectedOverlay` (CDK Overlay) — позиционируется вниз или вверх в зависимости от места на экране.
- Ширина панели совпадает с шириной `overlayOrigin` (по умолчанию — сам компонент).
- `OptionDirective` инжектирует `FORM_FIELD_SELECT` и вызывает `select.selectOption(value)` по клику.
- Выбранное значение синхронизируется через `model<T>()` (двустороннее связывание Angular Signals).
