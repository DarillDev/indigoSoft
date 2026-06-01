# Indigosoft

Примечание: при настройке проекта установил Jest и обновил Angular до последней версии (v21), которая на момент написания имеет проблемы совместимости с Jest. Покрытие тестами было принесено в жертву из-за этого технического конфликта. =)
Standalone и OnPush по умолчанию в schematic.

```bash
npm install       # установить зависимости
npm start         # dev-сервер → http://localhost:4200
npm run build     # production-сборка → dist/
npm test          # unit-тесты (Jest)
npm run lint      # линтинг TypeScript
```

## Архитектура

Проект разделён на горизонтальные слои.

```
src/app/
│
├── api/                          # Слой доступа к данным
│   ├── base/
│   │   └── api.service.ts        # Базовый HTTP-клиент (обёртка над HttpClient)
│   ├── config/
│   │   ├── api-config.interface.ts
│   │   ├── api-config.token.ts   # InjectionToken для базового URL
│   │   └── provide-api.function.ts
│   ├── controllers/
│   │   └── users/
│   │       ├── dtos/             # Формат данных как приходит с сервера
│   │       ├── mappers/          # DTO → внутренняя модель приложения
│   │       └── services/
│   │           ├── users-api/    # Прямые HTTP-запросы (CRUD)
│   │           └── users/        # Публичный API для фич (использует маппер)
│   └── types/                    # Общие типы запросов (QueryParams и т.д.)
│
├── core/                         # Инфраструктура приложения
│   └── app-environment/          # Конфиг окружения (API URL, флаги)
│       ├── interfaces/
│       ├── mappers/
│       ├── models/
│       └── utils/provide-app-environment.ts
│
├── layouts/                      # Каркас страниц
│   └── internal-layout/
│       ├── components/
│       │   ├── header/           # Шапка приложения
│       │   └── sidebar/          # Боковое меню
│       ├── internal-layout.component.*
│       └── internal-layout.routes.ts  # Корневой роутер — все маршруты через него
│
├── features/                     # Бизнес-функциональность
│   ├── feature-users/            # ✅ Основная фича задания
│   │   ├── components/
│   │   │   ├── edit-user-dialog/ # Модальное окно редактирования (Reactive Form)
│   │   │   │   └── interfaces/user-form.interface.ts
│   │   │   └── user-card/        # Карточка одного пользователя
│   │   ├── pages/
│   │   │   └── users-list-page/  # Страница со списком + фильтрация по имени
│   │   │       └── services/
│   │   │           └── user-list/ # Локальный state страницы (сигналы, isLoading)
│   │   └── users.routes.ts
│   │
│   ├── feature-posts/            # Заглушка второго раздела (расширяемость)
│   │   └── pages/posts-list-page/
│   │
│   └── shared/                   # Компоненты, используемые несколькими фичами
│       └── feature-users-list/   # ⭐ Переиспользуемый список с ngTemplateOutlet
│                                 #    (позволяет переопределить шаблон карточки)
│
└── shared/                       # Всё, что не привязано к конкретной фиче
    │
    ├── models/                   # Доменные модели
    │   ├── control-value-accessor.abstract.ts  # Базовый класс для CVA-компонентов
    │   ├── enums/role.enum.ts    # Роли пользователей
    │   ├── interfaces/
    │   │   ├── user.interface.ts
    │   │   └── address.interface.ts
    │   └── types/nillable.type.ts
    │
    ├── ds/                       # Design System — готовые UI-компоненты
    │   ├── card/                 # Карточка-обёртка
    │   ├── icon/                 # SVG-иконки (enum IconName)
    │   ├── inputs/
    │   │   ├── input-field/      # ✅ <app-input-field> — CVA, работает с formControlName
    │   │   ├── search-input/     # Поле поиска с иконкой
    │   │   └── models/input-base/ # Общий абстрактный класс для input-компонентов
    │   ├── selects/
    │   │   ├── select-field/     # ✅ <app-select-field> — CVA, работает с formControlName
    │   │   ├── interfaces/       # ISelectOption, ISelectOptionContext
    │   │   └── models/select-base/ # Абстрактный класс для select-компонентов
    │   ├── modal/
    │   │   ├── modal.service.ts  # Сервис открытия модалок (возвращает Observable)
    │   │   └── modal-container/  # Обёртка-контейнер для содержимого модалки
    │   └── nav-menu/             # Навигационное меню (используется в sidebar)
    │
    ├── ui-kit/                   # Низкоуровневые UI-примитивы (не DS-компоненты)
    │   ├── form-field/           # Обёртка поля формы: label + control + error + hint
    │   │   ├── directives/       # appLabel, appError, appHint, appPrefix, appSuffix
    │   │   ├── interfaces/form-field-control.interface.ts
    │   │   └── config/           # Токены для связи form-field ↔ control
    │   ├── input/
    │   │   └── input.directive.ts  # Директива [appInput] на нативный <input>
    │   └── select/               # Кастомный select (dropdown без зависимостей)
    │       ├── select.component.* # Контейнер с панелью опций
    │       ├── directives/       # appOption, appSelectTrigger
    │       └── interfaces/
    │
    ├── ui-pipes/
    │   └── control-error-text/   # Пайп для получения текста ошибки из FormControl
    │       ├── config/           # Токен + provide-функция для кастомных сообщений
    │       └── constants/default-errors.const.ts
    │
    └── utils/
        └── create-destroyer/     # createDestroyer() — хелпер для отписки через takeUntilDestroyed
```

## UI-Kit

Низкоуровневые примитивы, из которых собраны DS-компоненты (`ds/inputs`, `ds/selects`).

| Примитив            | README                                                          | Назначение                                                       |
| ------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------- |
| `ui-kit-form-field` | [ui-kit/form-field](src/app/shared/ui-kit/form-field/README.md) | Обёртка: label + контрол + prefix/suffix + hint/error            |
| `input[uiKitInput]` | [ui-kit/input](src/app/shared/ui-kit/input/README.md)           | Директива на нативный `<input>`, регистрирует его в `form-field` |
| `ui-kit-select`     | [ui-kit/select](src/app/shared/ui-kit/select/README.md)         | Кастомный select через CDK Overlay, реализует CVA                |

## Где проверять требования задания

| Требование                                            | Где смотреть                                                                                                              |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `UserListComponent` — список карточек                 | [feature-users-list.component.ts](src/app/features/shared/feature-users-list/feature-users-list.component.ts)             |
| Поля карточки: name, age, email, role                 | [user-card.component.html](src/app/features/feature-users/components/user-card/user-card.component.html)                  |
| Кнопка «Редактировать»                                | [user-card.component.ts](src/app/features/feature-users/components/user-card/user-card.component.ts)                      |
| Модальное окно с Reactive Form                        | [edit-user-dialog.component.ts](src/app/features/feature-users/components/edit-user-dialog/edit-user-dialog.component.ts) |
| `<app-input-field>` — CVA input                       | [input-field.component.ts](src/app/shared/ds/inputs/input-field/input-field.component.ts)                                 |
| `<app-select-field>` — CVA select                     | [select-field.component.ts](src/app/shared/ds/selects/select-field/select-field.component.ts)                             |
| Базовый класс CVA                                     | [control-value-accessor.abstract.ts](src/app/shared/models/control-value-accessor.abstract.ts)                            |
| `ngTemplateOutlet` — переопределение шаблона карточки | [feature-users-list.component.html](src/app/features/shared/feature-users-list/feature-users-list.component.html)         |
| OnPush Change Detection                               | Все компоненты: `changeDetection: ChangeDetectionStrategy.OnPush`                                                         |
| Standalone Components                                 | Все компоненты без `NgModule`                                                                                             |
| Фильтр по имени (опционально)                         | [users-list-page.component.ts](src/app/features/feature-users/pages/users-list-page/users-list-page.component.ts)         |
| Unit-тесты                                            | Файлы `*.spec.ts` рядом с компонентами                                                                                    |
| Полные требования задания                             | [docs/requirements.md](docs/requirements.md)                                                                              |
