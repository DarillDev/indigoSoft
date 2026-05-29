import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '@api/config';
import { TQueryParams } from '@api/types';

@Injectable({ providedIn: 'root' })
export class ApiService {
  protected readonly apiConfig = inject(API_CONFIG);
  private readonly httpClient = inject(HttpClient);

  public get baseUrl(): string {
    return this.apiConfig.baseUrl;
  }

  public get<T>(path: string, params?: TQueryParams): Observable<T> {
    return this.httpClient.get<T>(this.buildUrl(path), { params: this.buildParams(params) });
  }

  public post<T>(path: string, body: unknown, params?: TQueryParams): Observable<T> {
    return this.httpClient.post<T>(this.buildUrl(path), body, { params: this.buildParams(params) });
  }

  public put<T>(path: string, body: unknown, params?: TQueryParams): Observable<T> {
    return this.httpClient.put<T>(this.buildUrl(path), body, { params: this.buildParams(params) });
  }

  public patch<T>(path: string, body: unknown, params?: TQueryParams): Observable<T> {
    return this.httpClient.patch<T>(this.buildUrl(path), body, {
      params: this.buildParams(params),
    });
  }

  public delete<T>(path: string, params?: TQueryParams): Observable<T> {
    return this.httpClient.delete<T>(this.buildUrl(path), { params: this.buildParams(params) });
  }

  private buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  private buildParams(params?: TQueryParams): HttpParams {
    if (!params) {
      return new HttpParams();
    }

    return Object.entries(params).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        return value.reduce((p, v) => p.append(key, String(v)), acc);
      }
      return acc.set(key, String(value));
    }, new HttpParams());
  }
}
