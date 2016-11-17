import { TokenService } from '../token/token.service';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions, Response } from '@angular/http';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class ApiService {

  private delegation: Observable<Response>;


  constructor(private http: Http, private tokenService: TokenService) { }

  private request(url: string, options: RequestOptionsArgs): Observable<Response> {
    if (options.withCredentials === false) {
      return this.http.request(url, options);
    }
    options.headers.append('Authorization',`Bearer ${this.tokenService.token}`);

    return new Observable<Response>((obs: Observer<Response>) => this.requestDefer(obs, url, options))
      .catch(err => this.catchRequestError(err, url, options));
  }

  private delegateToken() {
    if (this.delegation) {
      return;
    }
    // the delegation that will refresh the token
    this.delegation = this.http.get('/api/v1/auth', {
      headers: new Headers({
        Authorization: `Bearer ${this.tokenService.token}`
      })
    }).cache();

    this.delegation.map(response=>response.text()).subscribe((token) => {
      this.delegation = undefined;
      this.tokenService.token = token;
    }, err => {
      // TODO : WHEN DELEGATION FAILS, LOGOUT
    });
  }

  catchRequestError(err: Response, url: string, options: RequestOptionsArgs): Observable<Response> | ErrorObservable {
    if (err.status !== 401) {
      return Observable.throw(err);
    }

    // we consider the jwt expired ( don't treat the invalid case yet )
    this.delegateToken();

    return this.request(url, options);
  }
  requestDefer(observer: Observer<Response>, url: string, options: RequestOptionsArgs) {
    let tokenValid = this.tokenService.isTokenExpired();


    if (tokenValid === false) {
      this.delegateToken();
    }

    if (this.delegation) {
      this.delegation.subscribe(() => {
        this.http.request(url, options).subscribe(observer.next);
      });
    }
  }

  private adaptRequest(url: string, method: RequestMethod, options?: RequestOptionsArgs, body?: any) {
    options = options || new RequestOptions({
      withCredentials: true
    });
    options.method = method;
    if (body) {
      options.body = body;
    }
    options.headers = options.headers || new Headers();
    return this.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.adaptRequest(url, RequestMethod.Get, options);
  }
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.adaptRequest(url, RequestMethod.Post, options, body);
  }
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.adaptRequest(url, RequestMethod.Put, options, body);
  }
  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.adaptRequest(url, RequestMethod.Delete, options);
  }
  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.adaptRequest(url, RequestMethod.Patch, options);
  }
  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.adaptRequest(url, RequestMethod.Head, options);
  }
  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.adaptRequest(url, RequestMethod.Options, options);
  }
}
