// import { JwtHelper } from 'angular2-jwt';
// import { Http, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
// import { Observable } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { TokenService } from '../token/token.service';

// @Injectable()
// export class CustomHttp extends Http {

//     private delegationPending = false;

//     constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, private tokenService: TokenService) {
//         super(_backend, _defaultOptions);
//     }

//     get(url: string, options?: RequestOptionsArgs): Observable<Response> {
//         options = options || this._defaultOptions;
//         options.headers = options.headers || new Headers();

//         // if withCredentials is false, there's no need for a token ( or anything else )
//         if (options.withCredentials === false && this.tokenService.token === undefined) {
//             return super.get(url, options);
//         }

//         if (!this.tokenService.isTokenExpired()) {
//             options.headers.append('Authorization', `Bearer ${this.tokenService.token}`);
//             return super.get(url, options);
//         }

//         // for now, just do the request
//         return super.get(url, options);
//     }
// }
