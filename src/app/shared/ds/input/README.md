# dsInput

Директива для нативного `<input>`, которая регистрирует его как контрол внутри `ds-form-field`.

## Использование

```html
<ds-form-field>
  <input dsInput [formControl]="ctrl" />
</ds-form-field>
```

## Inputs

| Input              | Тип                          | По умолчанию | Описание                                      |
|--------------------|------------------------------|--------------|-----------------------------------------------|
| `id`               | `string`                     | авто         | id элемента (генерируется автоматически)       |
| `isDisabled`       | `boolean`                    | `false`      | отключить вручную (без формы)                 |
| `emptyStateMatcher`| `(value: T) => boolean`      | —            | переопределить логику определения пустого поля|

## Поведение

- Провайдится как `FORM_FIELD_CONTROL` и реализует `IFormFieldControl`; `FormFieldComponent` получает контрол через `contentChild(FORM_FIELD_CONTROL)`.
- Сигнал `isEmpty` используется `FormFieldComponent` для floating-label.
- `onContainerClick()` ставит фокус на `<input>`; вызывается `FormFieldComponent` при клике по обёртке.
- `setDescribedByIds(ids)` проставляет `aria-describedby` от подключённых `dsError` / `dsHint`.
