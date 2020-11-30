import { throwError as observableThrowError, Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';
import { Injectable } from '@angular/core';
import { each } from 'lodash';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpOptions {
  body?: any;
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  responseType?: 'json';
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
};

export class QueryParamBuilder {
  private params: string[] = [];
  private constructor(private methodUrl: string) {}

  public static Instance(methodUrl: string): QueryParamBuilder {
    return new QueryParamBuilder(methodUrl);
  }

  public withParam(
    paramName: string,
    value: number | boolean | string | string[]
  ): QueryParamBuilder {
    if (value instanceof Array) {
      value.forEach((x) => {
        this.params.push(`${paramName}=${x}`);
      });
    } else {
      this.params.push(`${paramName}=${value}`);
    }
    return this;
  }

  public build(): string {
    const joinedParams: string = this.params.join('&');
    return `${this.methodUrl}?${joinedParams}`;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  private request<T>(
    url: string,
    method: string,
    options?: HttpOptions
  ): Observable<T> {
    options.headers = options.headers.append(
      'Authorization',
      `Bearer ${this.tokenService.token}`
    );

    return this.httpClient.request<T>(method, url, options).pipe(
      catchError((err: any) => {
        if (err.status === 401) {
          this.tokenService.token = undefined;
          this.router.navigateByUrl('/login');
        }
        return observableThrowError(err);
      })
    );
  }

  private normalizeRequest<T>(
    url: string,
    method: string,
    options?: HttpOptions,
    body?: any
  ): Observable<T> {
    const requestOptions = options || {};
    requestOptions.headers = requestOptions.headers || new HttpHeaders();
    requestOptions.responseType = requestOptions.responseType || 'json';
    if (body) {
      requestOptions.body = body;
    }
    return this.request(url, method, requestOptions);
  }

  get<T>(url: string, options?: HttpOptions): Observable<T> {
    if (options && options.body && !options.params) {
      let params = new HttpParams();
      each(options.body, (value, key) => (params = params.append(key, value)));
      options.params = params;
    }
    return this.normalizeRequest(url, HttpMethod.GET, options);
  }

  post<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this.normalizeRequest(url, HttpMethod.POST, options, body);
  }

  untypedPost(url: string, body: any): Observable<string> {
    return this.httpClient
      .post(url, body, {
        responseType: 'text',
      })
      .pipe(
        catchError((err: any) => {
          if (err.status === 401) {
            this.tokenService.token = undefined;
            this.router.navigateByUrl('/login');
          }
          return observableThrowError(err);
        })
      );
  }

  put<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this.normalizeRequest(url, HttpMethod.PUT, options, body);
  }

  delete<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.normalizeRequest(url, HttpMethod.DELETE, options);
  }

  patch<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this.normalizeRequest(url, HttpMethod.PATCH, options);
  }

  head<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.normalizeRequest(url, HttpMethod.HEAD, options);
  }

  options<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.normalizeRequest(url, HttpMethod.OPTIONS, options);
  }
}
