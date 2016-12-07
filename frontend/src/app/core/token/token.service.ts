import { locale } from 'moment';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class TokenService {
  public tokenKey: string = 'token-id';
  private _token:string = undefined

  private jwtHelper = new JwtHelper();
  private _isRefreshing: boolean;

  public get isRefreshing() {
    return this._isRefreshing;
  }

  constructor() {
    this._token = localStorage.getItem(this.tokenKey);
   }

  public get token() {
    return this._token;
  }
  public set token(value) {
    this._token = value;
    localStorage.setItem(this.tokenKey, value);
  }
  public isTokenExpired() {
    var token = this.token;
    if (!token) {
      return false;
    }
    return this.jwtHelper.isTokenExpired(token);

  }
}
