import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { AppEnvironmentMapper } from '@core';

void (async function bootstrapApp(): Promise<void> {
  const environmentPromise = fetch('/environment.json')
    .then((res) => res.json())
    .catch(() => console.error('App Environment is not provided'));
  const configResolverPromise = import('./app/app.config-resolver').then(
    (m) => m.appConfigResolver,
  );

  const [appEnvironmentDto, appConfigResolver] = await Promise.all([
    environmentPromise,
    configResolverPromise,
  ]);
  const appEnvironment = AppEnvironmentMapper.fromDto(appEnvironmentDto);

  await bootstrapApplication(AppComponent, appConfigResolver(appEnvironment));
})();
