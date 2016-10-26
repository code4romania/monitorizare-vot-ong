// import { Injectable } from '@angular/core';
// import { Headers, Http } from '@angular/http';
// import { JwtHelper } from 'angular2-jwt';

// @Injectable()
// export class TokenService {
//   private jwtHelper = new JwtHelper()
//   public tokenKey: string = 'token-id';

//   constructor(private http: Http) { }

//   public get token() {
//     return localStorage.getItem(this.tokenKey);
//   }
//   public set token(value) {
//     localStorage.setItem(this.tokenKey, value);
//   }

//   public refreshToken() {
//     let oldToken = this.token;
//     this.http.post('/api/account/delegation', {}, {
//       headers: new Headers({
//         Authorization: `Bearer ${oldToken}`
//       }),
//       withCredentials: false
//     })
//   }

//   public isTokenExpired() {
//     var token = this.token;
//     if (!token) {
//       return false;
//     }
//     return this.jwtHelper.isTokenExpired(token);

//   }
// }
