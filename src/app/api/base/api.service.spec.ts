import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_CONFIG, IApiConfig } from '@api/config';
import { ApiService } from './api.service';

const API_CONFIG_MOCK: IApiConfig = { baseUrl: 'https://api.test' };

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_CONFIG, useValue: API_CONFIG_MOCK },
      ],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('baseUrl', () => {
    it('should return base url from config', () => {
      expect(service.baseUrl).toBe('https://api.test');
    });
  });

  describe('get()', () => {
    it('should GET from the full url', () => {
      service.get('/users').subscribe();

      const req = httpMock.expectOne('https://api.test/users');
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('should serialize scalar query params', () => {
      service.get('/users', { page: 2, active: true, q: 'john' }).subscribe();

      const req = httpMock.expectOne((r) => r.url === 'https://api.test/users');
      expect(req.request.params.get('page')).toBe('2');
      expect(req.request.params.get('active')).toBe('true');
      expect(req.request.params.get('q')).toBe('john');
      req.flush([]);
    });

    it('should append each value for array query params', () => {
      service.get('/users', { ids: [1, 2, 3] }).subscribe();

      const req = httpMock.expectOne((r) => r.url === 'https://api.test/users');
      expect(req.request.params.getAll('ids')).toEqual(['1', '2', '3']);
      req.flush([]);
    });
  });

  describe('post()', () => {
    it('should POST body and params to the full url', () => {
      const body = { name: 'John' };

      service.post('/users', body, { dry: true }).subscribe();

      const req = httpMock.expectOne('https://api.test/users?dry=true');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(body);
      req.flush({});
    });
  });

  describe('put()', () => {
    it('should PUT body to the full url', () => {
      const body = { name: 'John' };

      service.put('/users/1', body).subscribe();

      const req = httpMock.expectOne('https://api.test/users/1');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toBe(body);
      req.flush({});
    });
  });

  describe('patch()', () => {
    it('should PATCH body to the full url', () => {
      const body = { name: 'John' };

      service.patch('/users/1', body).subscribe();

      const req = httpMock.expectOne('https://api.test/users/1');
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toBe(body);
      req.flush({});
    });
  });

  describe('delete()', () => {
    it('should DELETE from the full url', () => {
      service.delete('/users/1').subscribe();

      const req = httpMock.expectOne('https://api.test/users/1');
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });
});
