# ds-card

Контейнер-поверхность дизайн-системы. Блочный элемент на всю ширину родителя; проецирует контент в дефолтный слот. Inputs и логики нет.

## Импорт

Публичный API — бочка `@shared/ds/card`.

```ts
import { CardComponent } from '@shared/ds/card';

@Component({
  selector: 'app-example',
  imports: [CardComponent],
  templateUrl: './example.component.html',
})
export class ExampleComponent {}
```

## Использование

```html
<ds-card>
  <h3>Заголовок</h3>
  Контент проецируется в дефолтный слот.
</ds-card>
```

## `<ds-card>`

Селектор: `ds-card`. Inputs: нет.

Оформление задаётся CSS-переменными; переопределяются на любом предке.

| Свойство | CSS-переменная    |
| -------- | ----------------- |
| Фон      | `--color-surface` |
| Радиус   | `--radius-md`     |
| Тень     | `--shadow-card`   |

```html
<section style="--shadow-card: none">
  <ds-card>Карточка без тени</ds-card>
</section>
```

## Публичный API

| Имя             | Вид       | Селектор    |
| --------------- | --------- | ----------- |
| `CardComponent` | компонент | `ds-card`   |
