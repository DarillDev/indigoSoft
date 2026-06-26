# ds-icon

Иконка из SVG-спрайта. Рендерит `<svg><use href="/icons.svg#icon-{name}"/></svg>`. Цвет — `currentColor`. Размер — квадрат со стороной `size`.

## Импорт

Публичный API — бочка `@shared/ds/icon`. Имена иконок — enum `IconName`.

```ts
import { IconComponent, IconName } from '@shared/ds/icon';

@Component({
  selector: 'app-example',
  imports: [IconComponent],
  templateUrl: './example.component.html',
})
export class ExampleComponent {
  protected readonly IconName = IconName;
}
```

## Использование

```html
<ds-icon [name]="IconName.Search" />
<ds-icon [name]="IconName.Close" [size]="24" />
<ds-icon name="mail" />
```

## `<ds-icon>`

Селектор: `ds-icon`.

| Input  | Тип                            | По умолчанию | Описание                              |
| ------ | ------------------------------ | ------------ | ------------------------------------- |
| `name` | `IconName \| \`${IconName}\``   | — (required) | Идентификатор символа в `/icons.svg`. |
| `size` | `number`                       | `16`         | Сторона квадрата, px.                  |

Цвет инпутом не задаётся — наследуется от `color` родителя через `currentColor`. Хост — `inline-flex` с центрированием.

## Иконки

`edit` · `mail` · `location` · `calendar` · `chevron-down` · `close` · `search`

Источник — enum [`IconName`](enums/icon-name.enum.ts) и спрайт `/icons.svg` (символы `#icon-{name}`).

## Публичный API

| Имя             | Вид       | Описание                          |
| --------------- | --------- | --------------------------------- |
| `IconComponent` | компонент | селектор `ds-icon`                |
| `IconName`      | enum      | имена иконок (алиас `EIconName`)  |
