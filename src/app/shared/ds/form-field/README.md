# ds-form-field

Обёртка поля формы. Объединяет контрол (input / select) с лейблом, префиксом, суффиксом, подсказкой и ошибкой.

## Использование

```html
<ds-form-field>
  <ds-label>Email</ds-label>

  <span dsPrefix>@</span>

  <input dsInput [formControl]="emailCtrl" />

  <span dsSuffix>✓</span>

  <ds-hint>Введите рабочий адрес</ds-hint>
  <ds-error>{{ emailCtrl | controlErrorText }}</ds-error>
</ds-form-field>
```

## Слоты (content projection)

| Селектор                          | Директива        | Описание                                      |
|-----------------------------------|------------------|-----------------------------------------------|
| `ds-label`, `[dsLabel]`    | `LabelDirective` | Лейбл поля                                    |
| `[dsPrefix]`, `ds-prefix`  | `PrefixDirective`| Контент слева от контрола                     |
| `[dsSuffix]`, `ds-suffix`  | `SuffixDirective`| Контент справа от контрола                    |
| `ds-hint`, `[dsHint]`      | `HintDirective`  | Подсказка под полем (скрывается при ошибке)   |
| `ds-error`, `[dsError]`    | `ErrorDirective` | Текст ошибки (имеет приоритет над hint)       |
| *(default)*                       | —                | Сам контрол: `input[dsInput]` или `ds-select` |

## Как работает

- Ищет контрол через токен `FORM_FIELD_CONTROL` (`contentChild`).
- Передаёт контролу список `aria-describedby` (ids hint + error) через `effect`.
- При наличии `dsError` — hint скрывается, обёртка получает класс `--error`.
- Клик по обёртке делегируется в `control.onContainerClick()` (фокус на input / открытие select).

## Токены

`FormFieldComponent` провайдит себя как `FORM_FIELD`. Контрол в дефолтном слоте провайдится как `FORM_FIELD_CONTROL` и реализует `IFormFieldControl`; `FormFieldComponent` получает его через `contentChild(FORM_FIELD_CONTROL)`.

| Токен               | Провайдер           | Контракт            | Потребитель                                  |
|---------------------|---------------------|---------------------|----------------------------------------------|
| `FORM_FIELD`        | `FormFieldComponent`| —                   | вложенные директивы поля                      |
| `FORM_FIELD_CONTROL`| контрол слота       | `IFormFieldControl` | `FormFieldComponent` (`contentChild`)         |

`IFormFieldControl`: `id`, `isEmpty`, `isDisabled`, `onContainerClick(event)`, `setDescribedByIds(ids)`.
