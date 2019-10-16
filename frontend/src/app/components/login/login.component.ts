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

    user: string;
    password: string;

    invalid: boolean;

    loginSubscription: Subscription;

    tryLogin() {
        if (this.loginSubscription) {
            this.loginSubscription.unsubscribe();
        }
        this.loginSubscription = this.http.untypedPost('/api/v1/access/authorize', {
            user: this.user,
            password: this.password
        })
            .subscribe(res => {
                this.tokenService.token = res;
                this.router.navigate(['/urgents']);
            }, () => {
                this.invalid = true;
            })
    }

    ngOnInit() {

    }
}
