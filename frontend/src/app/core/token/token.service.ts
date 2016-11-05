import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class TokenService {
  public tokenKey: string = 'token-id';

  private jwtHelper = new JwtHelper();
  private _isRefreshing: boolean;

  public get isRefreshing() {
    return this._isRefreshing;
  }

  constructor() { }

  public get token() {
    return localStorage.getItem(this.tokenKey);
  }
  public set token(value) {
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
