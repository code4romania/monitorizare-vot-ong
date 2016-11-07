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

enum JWT_HTTP_STATES {
  NORMAL = 1,
  IS_REFRESHING
};

@Injectable()
export class AuthHttpService extends Http {

  JWT_STATE: JWT_HTTP_STATES = JWT_HTTP_STATES.NORMAL;

  private delegationStream: Observable<any>;

  private token: string;

  constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions) {
    super(_backend, _defaultOptions);
  }


  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {



    if (this.JWT_STATE === JWT_HTTP_STATES.NORMAL) {
      return this.requestNormal(url, options);
    } else {
      return this.doRequest(url, options);
    }



  }

  private doRequest(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    options = options || new RequestOptions({
      headers: new Headers()
    });
    options.headers = options.headers || new Headers();
    options.headers.append('Authorization', 'Bearer: ' + this.token);
    return super.request(url, options);
  }

  private requestNormal(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

    let jwtExpired = true;
    if (jwtExpired) {
      this.setDelegationObservable();
      // 
      return this.delegationStream.flatMap(() => {
        return this.doRequest(url, options);
      });
    } else {
      return this.doRequest(url, options);
    }

  }
  private setDelegationObservable() {
    if (this.delegationStream) {
      return;
    }
    this.delegationStream = Observable.create((obs: Observer<any>) => {
      obs.next('test');
      obs.complete();
    }).share();
  }
  private requestExpired(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    // start refreshing the jwt

    this.JWT_STATE = JWT_HTTP_STATES.IS_REFRESHING;

    // I need an observable that will wait for the delegation call
    let delegationObservable = Observable.create(observer => {
      setTimeout(() => {
        observer.next('10');
      })
    })
      .share();

    delegationObservable.subscribe(token => {
      this.JWT_STATE = JWT_HTTP_STATES.NORMAL;
      this.token = token;
    });
    return delegationObservable.flatMap(() => {
      return this.doRequest(url, options);
    }).subscribe();
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
