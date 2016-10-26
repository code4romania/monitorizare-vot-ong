
// import { Headers, Http } from '@angular/http';
// import { Injectable } from '@angular/core';
// import { TokenService } from '../token/token.service';
// import { Observable, Observer } from 'rxjs';

// @Injectable()
// export class AuthentificationService {

//   private jwtHelper = new JwtHelper();

//   constructor(private http: Http, private tokenService: TokenService) { }


//   public login(username: string, password: string) {
//     let body = {
//       username: username,
//       password: password
//     };

//     return this.http.post('/api/account/login', body)
//       .map((response) => response.json())
//       .do((token) => this.tokenService.token = token)
//   }

//   public logoff() {
//     return this.http.post('/api/account/logoff', {})
//       .map((resp) => resp.json())
//       .do(() => this.tokenService.token = undefined);
//   }
// }
