# ui-kit-select

Кастомный select без сторонних UI-зависимостей (использует только `@angular/cdk/overlay`).  
Реализует `ControlValueAccessor` — работает с `formControlName` / `[formControl]`.  
Совместим с `ui-kit-form-field` через токен `FORM_FIELD_CONTROL`.

## Использование

```html
<ui-kit-form-field>
  <ui-kit-label>Роль</ui-kit-label>

  <ui-kit-select [formControl]="roleCtrl" placeholder="Выберите роль">
    <ui-kit-option value="admin">Admin</ui-kit-option>
    <ui-kit-option value="user">User</ui-kit-option>
    <ui-kit-option value="guest" disabled>Guest</ui-kit-option>
  </ui-kit-select>

  <ui-kit-error>{{ roleCtrl | controlErrorText }}</ui-kit-error>
</ui-kit-form-field>
```

### Кастомный trigger

```html
<ui-kit-select [formControl]="ctrl">
  <ng-template uiKitSelectTrigger>
    <app-icon [name]="selectedIcon()" /> {{ selectedLabel() }}
  </ng-template>
  <ui-kit-option [value]="item" *ngFor="let item of items">{{ item.label }}</ui-kit-option>
</ui-kit-select>
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
| `ui-kit-option [value]`          | Опция списка; поддерживает атрибут `disabled`   |
| `[uiKitSelectTrigger]`           | Кастомное содержимое кнопки-триггера            |

## Как работает

- Панель опций открывается через `cdkConnectedOverlay` (CDK Overlay) — позиционируется вниз или вверх в зависимости от места на экране.
- Ширина панели совпадает с шириной `overlayOrigin` (по умолчанию — сам компонент).
- `OptionDirective` инжектирует `FORM_FIELD_SELECT` и вызывает `select.selectOption(value)` по клику.
- Выбранное значение синхронизируется через `model<T>()` (двустороннее связывание Angular Signals).
