import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import * as _ from 'lodash';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class ApiService {

  private tokenRefreshObservable: Observable<Response>;


  constructor(private http: Http, private tokenService: TokenService, private router: Router) { }


  private request(url: string, options: RequestOptionsArgs): Observable<Response> {

    if (options.withCredentials === false) {
      return this.http.request(url, options);
    }
    options.headers.append('Authorization', 'Bearer ' + this.tokenService.token);

    return this.http.request(url, options).catch((err: Response, res) => {

      if (err.status === 401) {
        this.tokenService.token = undefined;
        this.router.navigateByUrl('/login');
      }

      return Observable.throw(err);
    });
    // return  new Observable<Response>((obs: Observer<Response>) => this.requestSubscribe(obs, url, options))
    //   .catch(err => this.handleRequestError(err, url, options));
  }
  private requestSubscribe(observer: Observer<Response>, url: string, options: RequestOptionsArgs) {
    let tokenExpired = this.tokenService.isTokenExpired();


    if (tokenExpired) {
      this.refreshToken();
    }

    if (this.tokenRefreshObservable) {
      this.tokenRefreshObservable.subscribe(() => {
        this.http.request(url, options).subscribe(observer.next);
      });
    }
  }
  private handleRequestError(err: Response, url: string, options: RequestOptionsArgs): Observable<Response> | ErrorObservable {
    if (err.status !== 401) {
      return Observable.throw(err);
    }

    // logout, and go to homepage
    // TODO LOGOUT

    // // we consider the jwt expired ( don't treat the invalid case yet )
    // this.refreshToken();
    // return this.request(url, options);
  }
  private normalizeRequest(url: string, method: RequestMethod, options?: RequestOptionsArgs, body?: any) {
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
  private refreshToken() {
    if (this.tokenRefreshObservable) {
      return;
    }
    // the tokenRefreshObservable that will refresh the token
    this.tokenRefreshObservable = this.http.get('/api/v1/auth', {
      headers: new Headers({
        Authorization: 'Bearer ' + this.tokenService.token
      })
    });

    this.tokenRefreshObservable.map(response => response.text()).subscribe((token) => {
      this.tokenRefreshObservable = undefined;
      this.tokenService.token = token;
    }, err => {
      // TODO : WHEN tokenRefreshObservable FAILS, LOGOUT
    });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    if (options && options.body && !options.search) {
      let search = new URLSearchParams();
      _.each(options.body, (value, key) => {
        search.set(key, value);
      });
      options.search = search;
    }
    return this.normalizeRequest(url, RequestMethod.Get, options);
  }
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.normalizeRequest(url, RequestMethod.Post, options, body);
  }
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.normalizeRequest(url, RequestMethod.Put, options, body);
  }
  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.normalizeRequest(url, RequestMethod.Delete, options);
  }
  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.normalizeRequest(url, RequestMethod.Patch, options);
  }
  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.normalizeRequest(url, RequestMethod.Head, options);
  }
  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.normalizeRequest(url, RequestMethod.Options, options);
  }
}
