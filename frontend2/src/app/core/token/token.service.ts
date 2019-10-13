import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class TokenService {
  public tokenKey: string = 'token-id';
  tokenStream: Observable<string>;
  observers: Observer<string>[] = [];

  constructor() {
    this._token = localStorage.getItem(this.tokenKey);
    this.setTokenStream();
  }

  private _token: string = undefined;

  public get token() {
    return this._token;
  }

  public set token(value) {
    this._token = value;
    if (value !== undefined) {
      localStorage.setItem(this.tokenKey, value);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
    this.observers.forEach(obs => obs.next(value));
  }

  private _isRefreshing: boolean;

  public get isRefreshing() {
    return this._isRefreshing;
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
}
