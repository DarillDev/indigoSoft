import { runInInjectionContext, EnvironmentInjector, createEnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { inject } from '@angular/core';
import { API_CONFIG } from './api-config.token';
import { provideApiConfig } from './provide-api.function';

describe('provideApiConfig()', () => {
  it('should register the given config under API_CONFIG token', () => {
    const config = { baseUrl: 'https://api.test' };
    const parent = TestBed.inject(EnvironmentInjector);
    const injector = createEnvironmentInjector([provideApiConfig(config)], parent);

    const resolved = runInInjectionContext(injector, () => inject(API_CONFIG));

    expect(resolved).toBe(config);
  });
});
