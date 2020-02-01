import {Observable, Observer} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class TokenService {
  public tokenKey = 'token-id';
  private _token: string = undefined;

  private _isRefreshing: boolean;

  tokenStream: Observable<string>;
  observers: Observer<string>[] = [];


  public get isRefreshing() {
    return this._isRefreshing;
  }

  constructor() {
    this._token = localStorage.getItem(this.tokenKey);
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

  public get token() {
    return this._token;
  }
  public set token(value) {
    this._token = value;
    if (value !== undefined){
      localStorage.setItem(this.tokenKey, value);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
    this.observers.forEach(obs => obs.next(value));
  }
}
