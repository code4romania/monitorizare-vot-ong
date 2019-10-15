import { Subscription } from 'rxjs/Rx';
import { TokenService } from '../../core/token/token.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/apiService/api.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'environments/environment';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    private baseUrl: string;
    constructor(private http: ApiService, private router: Router, private tokenService: TokenService) {
        this.baseUrl = environment.apiUrl;
    }

    userName: string;
    password: string;

    invalid: boolean;

    loginSubscription: Subscription;

    tryLogin() {
        if (this.loginSubscription) {
            this.loginSubscription.unsubscribe();
        }
        const authUrl: string = Location.joinWithSlash(this.baseUrl, '/api/v1/auth');
        this.loginSubscription = this.http.untypedPost(authUrl, {
            userName: this.userName,
            password: this.password
        })
            .subscribe(res => {
                this.tokenService.token = res;
                this.router.navigate(['/urgente']);
            }, () => {
                this.invalid = true;
            })
    }

    ngOnInit() {

    }
}
