import { Subscription } from 'rxjs/Rx';
import { TokenService } from '../../core/token/token.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/apiService/api.service';
import { Component, OnInit } from '@angular/core';
@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private http: ApiService, private router: Router, private tokenService: TokenService) { }

    userName: string;
    password: string;

    invalid: boolean;

    loginSubscription: Subscription;

    tryLogin() {
        if (this.loginSubscription) {
            this.loginSubscription.unsubscribe();
        }
        this.loginSubscription = this.http.post('/api/v1/auth', {
            userName: this.userName,
            password: this.password
        })
            .subscribe(res => {
                this.tokenService.token = res.text();
                this.router.navigate(['/urgente']);
            }, res => {
                this.invalid = true;
            })
    }

    ngOnInit() {

    }
}