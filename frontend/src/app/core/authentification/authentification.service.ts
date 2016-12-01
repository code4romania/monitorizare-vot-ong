import { ApiService } from '../apiService/api.service';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class AuthentificationService {

    private _isLoggedIn = false;

    public get isLoggedIn() {
        return this._isLoggedIn;
    }

    constructor(private http: Http, private apiService: ApiService, private tokenService: TokenService) { }


    public login(username: string, password: string) {

        let body = {
            username: username,
            password: password
        }

        let loginObservable = this.http.post('/api/v1/auth', body)
            .map((response) => response.text()).share();

        loginObservable.subscribe(token => {
            this.tokenService.token = token;
            this._isLoggedIn = true;
        });

        return loginObservable;

    }
}
