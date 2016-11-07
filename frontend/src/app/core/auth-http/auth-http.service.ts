import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';
import { getHeapStatistics } from 'v8';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { TokenService } from '../token/token.service';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { Observable, Observer } from 'rxjs/Rx';
import {
  ConnectionBackend,
  Headers,
  Http,
  Request,
  RequestMethod,
  RequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthHttpService extends Http {

  private delegation: Observable<any>;

  private token: string;

  constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions) {
    super(_backend, _defaultOptions);
  }


  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let jwtValid = false;

    if (!jwtValid) {
      if (!this.delegation) {
        this.setDelegationObservable();
      }
      return this.delegation.flatMap(() => {
        return this.doRequest(url, options);
      });
    }
    return this.doRequest(url, options);
  }

  private doRequest(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    options = options || new RequestOptions({
      headers: new Headers()
    });
    options.headers = options.headers || new Headers();
    options.headers.append('Authorization', 'Bearer: ' + this.token);    
    return super.request(url, options).catch((err) => {
      if (err.code = 401) {
        if (!this.delegation) {
          this.setDelegationObservable();
        }
        return this.delegation.flatMap(() => {
          return super.request(url, options);
        })
      }
      return Observable.throw(err);
    })
  }
  private setDelegationObservable() {
    // the delegation that will refresh the token
    this.delegation = Observable.create((obs: Observer<any>) => {
      setTimeout(() => {
        obs.next('test');
        obs.complete();
      }, 1000);
    }).share();

    this.delegation.subscribe((token) => {
      this.delegation = undefined;
      this.token = token;
    })
  }

  /**
	 * Performs a request with `get` http method.
	 */
  get(url: string, options?: RequestOptions): Observable<Response> {
    options.method = RequestMethod.Get;
    return this.request(url, options);
  }

	/**
	 * Performs a request with `post` http method.
	 */
  post(url: string, body: any, options?: RequestOptions): Observable<Response> {
    options.method = RequestMethod.Post;
    options.body = body;
    return this.request(url, options);
  }

	/**
	 * Performs a request with `put` http method.
	 */
  put(url: string, body: any, options?: RequestOptions): Observable<Response> {
    options.method = RequestMethod.Put;
    options.body = body;
    return this.request(url, options);
  }

	/**
	 * Performs a request with `delete` http method.
	 */
  delete(url: string, options?: RequestOptions): Observable<Response> {
    options.method = RequestMethod.Delete;
    return this.request(url, options);
  }

	/**
	 * Performs a request with `patch` http method.
	 */
  patch(url: string, body: any, options?: RequestOptions): Observable<Response> {
    options.method = RequestMethod.Patch;
    options.body = body;
    return this.request(url, options);
  }

	/**
	 * Performs a request with `head` http method.
	 */
  head(url: string, options?: RequestOptions): Observable<Response> {
    options.method = RequestMethod.Head;
    return this.request(url, options);
  }

	/**
	 * Performs a request with `options` http method.
	 */
  options(url: string, options?: RequestOptions): Observable<Response> {
    options.method = RequestMethod.Options;
    return this.request(url, options);
  }

}
