import {Observable, Observer} from 'rxjs';
import {Injectable} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../models/user.model';

@Injectable()
export class TokenService {
  jwtHelper = new JwtHelperService();

  public tokenKey = 'token-id';
  private _token: string = undefined;
  private _user: User;

  private _isRefreshing: boolean;

  tokenStream: Observable<string>;
  observers: Observer<string>[] = [];


  public get isRefreshing() {
    return this._isRefreshing;
  }

  constructor() {
    this._token = localStorage.getItem(this.tokenKey);
    this._user = this.getUserFromToken(this._token);
    this.setTokenStream();
  }

  setTokenStream() {
    this.tokenStream = Observable.create((obs: Observer<string>) => {
      obs.next(this._token);
      this.observers.push(obs);
      return () => {
        this.observers = this.observers.filter(stateObserver => stateObserver === obs);
      };
    });
  }

  public get userName() {
    return this._user.sub;
  }
  public get user() {
    return this._user;
  }
  public get token() {
    return this._token;
  }
  public set token(value) {
    this._token = value;
    if (value !== undefined){
      localStorage.setItem(this.tokenKey, value);
      this._user = this.getUserFromToken(value);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
    this.observers.forEach(obs => obs.next(value));
  }
  private getUserFromToken(token: string): User {
    const decodedToken = this.jwtHelper.decodeToken(token);
    if (!decodedToken) return null;
    return {
      sub: decodedToken.sub,
      idNgo: decodedToken.IdNgo,
      userType: decodedToken.UserType,
      organizer: decodedToken.Organizer
    };
  }
  public isloggedIn() {
    return this.token ? true : false;
  }
}
