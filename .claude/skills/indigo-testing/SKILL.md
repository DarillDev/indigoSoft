---
name: indigo-testing
description: Написание unit-тестов в Angular-проектах на стеке vitest (indigoSoft, okolo). Покрывает структуру describe (Model/View/ViewModel), нейминг (методы с (), observable-поля с $), паттерн Arrange/Act/Assert, обязательную проверку моков (count + args), моки зависимостей через MockedObject<T> + vi.fn(), тесты pipe/directive/service/component, RxJS Marbles через TestScheduler, fakeAsync и flushEffects в zoneless. Адаптировано из методички bbp (Jest) на vitest. Использовать при написании или ревью любого *.spec.ts. НЕ описывает конфиг раннера (он уже настроен через @angular/build:unit-test + runner vitest).
---

# Написание тестов (vitest)

Стек: Angular standalone + signals + **zoneless**, раннер — `@angular/build:unit-test` с `runner: "vitest"`. Глобалы `vitest/globals` включены — `describe`/`it`/`expect`/`vi` **без импортов**. Запуск — `npm test` (= `ng test`).

Эталон: [users-list-page.component.spec.ts](../../../src/app/features/feature-users/pages/users-list-page/users-list-page.component.spec.ts) — компонент с моками сервиса, computed-сигналами, fakeTimers и `flushEffects`.

Методика перенята из проекта bbp (там Jest); здесь — та же методика на vitest.

## 1. Структура вложенности `describe` (обязательно)

```
describe('ClassName')                    // верх — сущность под тестом
  describe('Model' | 'View' | 'ViewModel')   // категория — ОДНА, если нужна
    describe('methodName()')             // метод / поле
      it('should …')                     // кейс
```

Категория (ровно одна):

- `Model` — сервисы, бизнес-логика, computed/состояние компонента (**самая частая**).
- `View` — DOM/шаблон компонента (querySelector, textContent, клики).
- `ViewModel` — логика/фасад компонента без проверки DOM.

Доп. уровень допустим для группировки (`describe('Error handling')`), но предпочитаем плоско.

## 2. Нейминг

| Что | Правило | Пример |
|-----|---------|--------|
| `describe` верх/категория | с Заглавной | `describe('Model')` |
| Метод | с `()` | `describe('getUserById()')` |
| Computed signal (вызывается через `()`) | с `()` | `describe('filteredUsers()')` |
| Observable-поле | строчная + `$` | `describe('users$')` |
| `it` | со **строчной**, фраза `should …` | `it('should return user by id')` |
| Переменная | абстрактно по типу | `component` / `fixture` / `service` / `directive` / `pipe` |

## 3. Arrange / Act / Assert (обязательно)

Три блока, разделённые **ровно одной** пустой строкой. **Без** пустых строк внутри блока. **Без** комментариев `// Arrange`.

```ts
it('should toggle current theme', () => {
  settingsApiServiceMock.updateGeneralSettings.mockReturnValue(of(undefined));
  themeServiceMock.toggleTheme.mockReturnValue(of('dark'));

  service.toggleTheme();

  expect(themeServiceMock.toggleTheme).toHaveBeenCalledTimes(1);
  expect(themeServiceMock.toggleTheme).toHaveBeenCalledWith();
});
```

## 4. Проверка моков (обязательно — ключевое правило)

`.toHaveBeenCalled()` **в одиночку запрещён**. Всегда **count + аргументы**:

- 1 вызов → `.toHaveBeenCalledTimes(1)` + `.toHaveBeenCalledWith(...)`
- N вызовов → `.toHaveBeenCalledTimes(N)` + `.toHaveBeenNthCalledWith(1, …)`, `(2, …)` для **каждого**
- Нельзя `.toHaveBeenLastCalledWith()` ради пропуска ранних вызовов.

```ts
// ❌ плохо
expect(service.getUser).toHaveBeenCalled();
// ✅ один вызов
expect(service.getUser).toHaveBeenCalledTimes(1);
expect(service.getUser).toHaveBeenCalledWith(userId);
// ✅ несколько — проверяем КАЖДЫЙ
expect(service.getUser).toHaveBeenCalledTimes(2);
expect(service.getUser).toHaveBeenNthCalledWith(1, 'user-1');
expect(service.getUser).toHaveBeenNthCalledWith(2, 'user-2');
```

## 5. Моки зависимостей

Тип — `MockedObject<T>` (`import { type MockedObject } from 'vitest'`). Методы — `vi.fn()`.

```ts
let usersService: MockedObject<UsersService>;

TestBed.configureTestingModule({
  imports: [UsersListPageComponent],
  providers: [
    { provide: UsersService, useValue: { getAllUsers: vi.fn().mockReturnValue(of(MOCK_USERS)) } },
  ],
});
usersService = TestBed.inject(UsersService) as MockedObject<UsersService>;
```

- Приватные поля/методы — bracket-нотация: `component['filteredUsers']()`, `service['value$']`.
- Шпион — `vi.spyOn(obj, 'method')`. Глушим вывод — `vi.spyOn(console, 'error').mockImplementation(() => {})`.

## 6. Паттерны по типам

### Pipe (чистый) — без TestBed

```ts
describe('LeveragePipe', () => {
  let pipe: LeveragePipe;
  beforeEach(() => { pipe = new LeveragePipe(); });

  describe('transform()', () => {
    it('should format leverage', () => {
      expect(pipe.transform('5')).toBe('5x');
    });
  });
});
```

Pipe с DI — через `TestBed.configureTestingModule({ providers: [MyPipe] })` + `TestBed.inject(MyPipe)`.

### Directive — через хост-компонент

```ts
@Component({ template: `<div appHighlight [color]="color">Test</div>`, imports: [HighlightDirective] })
class TestHostComponent { color = 'yellow'; }

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
    fixture = TestBed.createComponent(TestHostComponent);
  });

  describe('Model', () => {
    it('should highlight element with given color', () => {
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector('div');
      expect(el.style.backgroundColor).toBe('yellow');
    });
  });
});
```

Структурную директиву (`*appHas…`) проверяем по `fixture.nativeElement.textContent.trim()`.

### Service — моки зависимостей + TestBed

```ts
describe('TimeFormatService', () => {
  let service: TimeFormatService;
  let apiMock: MockedObject<SettingsApiService>;

  beforeEach(() => {
    apiMock = { updateGeneralSettings: vi.fn() } as unknown as MockedObject<SettingsApiService>;
    TestBed.configureTestingModule({
      providers: [TimeFormatService, { provide: SettingsApiService, useValue: apiMock }],
    });
    service = TestBed.inject(TimeFormatService);
  });
});
```

### Component — моки сервисов, проверка состояния (Model) или DOM (View)

См. эталон [users-list-page.component.spec.ts](../../../src/app/features/feature-users/pages/users-list-page/users-list-page.component.spec.ts).

## 7. Асинхронность (vitest 4 — БЕЗ `done`-callback)

Sync-observable (`of`/`throwError`) — через `firstValueFrom` + `async`:

```ts
it('should fetch users from API', async () => {
  httpClient.get.mockReturnValue(of(MOCK_USERS));

  const result = await firstValueFrom(service.getUsers());

  expect(result).toEqual(MOCK_USERS);
  expect(httpClient.get).toHaveBeenCalledTimes(1);
  expect(httpClient.get).toHaveBeenCalledWith('/api/users');
});
```

Таймеры (`debounceTime` и т.п.) — `vi.useFakeTimers()` / `vi.advanceTimersByTime(ms)`, сброс в `afterEach(() => vi.useRealTimers())`. `fakeAsync`/`tick` (из `@angular/core/testing`) тоже работают.

## 8. RxJS Marbles — `TestScheduler` (из `rxjs/testing`, не зависит от раннера)

Для операторов времени/комбинации (`debounceTime`, `switchMap`, `retry`, `combineLatest`):

```ts
let scheduler: TestScheduler;
beforeEach(() => {
  scheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));
});

it('should debounce and search', () => {
  scheduler.run(({ cold, expectObservable }) => {
    const input$ = cold('a-b-c---d---|');
    const result$ = input$.pipe(debounceTime(30, scheduler), distinctUntilChanged());
    expectObservable(result$).toBe('--------c---d|', { c: 'c', d: 'd' });
  });
});
```

Синтаксис: `-` кадр (10ms), `|` complete, `#` error, `(ab)` синхронная эмиссия, `^`/`!` подписка/отписка.

## 9. Zoneless: `TestBed.flushEffects()`

Приложение zoneless — эффекты, загрузка `resource()`, реактивные записи **не выполняются сами**. После мутации состояния без полного CD дёргаем `TestBed.flushEffects()`, чтобы реактивный граф осел перед чтением сигналов.

- **Нужен**, когда состояние приезжает через эффект/`resource` (загрузка/перезагрузка в сервисе) — в `beforeEach` после `detectChanges()` и в тестах, дёргающих перезагрузку.
- **Не нужен** для `toSignal` + чистого `computed`: `toSignal` пишет сигнал синхронно в колбэке подписки, `computed` пересчитывается лениво при чтении — эффектов в цепочке нет.

## Чек-лист перед сдачей

- [ ] Структура `describe('Class') > describe('Model'|'View') > describe('method()')`.
- [ ] Методы и computed — с `()`; observable-поля — `$`; `it` со строчной `should …`.
- [ ] AAA: три блока, одна пустая строка между, без комментариев-маркеров.
- [ ] Каждый мок проверен по count + args (никаких голых `toHaveBeenCalled()`).
- [ ] Покрыты success + error + edge (null/undefined/пусто).
- [ ] `npm test` зелёный, без unhandled-ошибок в выводе.
