# ds-nav-menu

Навигационное меню на роутере. Два компонента:

- `NavMenuComponent` (`ds-nav-menu`) — обёртка `<nav>`, проецирует пункты в дефолтный слот.
- `NavMenuItemComponent` (`ds-nav-menu-item`) — пункт-ссылка через `routerLink`; активный маршрут помечается классом `active` (`routerLinkActive`) и `aria-current="page"`.

Требование: в приложении подключён `provideRouter(...)`.

## Импорт

```ts
import { NavMenuComponent, NavMenuItemComponent } from '@shared/ds/nav-menu';

@Component({
  selector: 'app-sidebar',
  imports: [NavMenuComponent, NavMenuItemComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {}
```

## Использование

```html
<ds-nav-menu>
  <ds-nav-menu-item link="/users" label="Пользователи" />
  <ds-nav-menu-item link="/settings" label="Настройки" />
</ds-nav-menu>
```

## `<ds-nav-menu>`

Селектор: `ds-nav-menu`. Inputs: нет. Оборачивает контент в `<nav>`.

## `<ds-nav-menu-item>`

Селектор: `ds-nav-menu-item`.

| Input   | Тип      | По умолчанию | Описание               |
| ------- | -------- | ------------ | ---------------------- |
| `link`  | `string` | — (required) | Путь для `routerLink`. |
| `label` | `string` | — (required) | Текст пункта.          |

Активное состояние: при совпадении текущего URL с `link` элемент получает класс `active`, ссылка — `aria-current="page"`.

## Публичный API

| Имя                    | Вид       | Селектор           |
| ---------------------- | --------- | ------------------ |
| `NavMenuComponent`     | компонент | `ds-nav-menu`      |
| `NavMenuItemComponent` | компонент | `ds-nav-menu-item` |
