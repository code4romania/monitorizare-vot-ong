import { Subscription } from 'rxjs';
import { TokenService } from '../../core/token/token.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/apiService/api.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private baseUrl: string;
  constructor(
    private http: ApiService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.baseUrl = environment.apiUrl;
  }

  user: string;
  password: string;

  invalid: boolean;

  loginSubscription: Subscription;

  tryLogin() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    const authUrl: string = Location.joinWithSlash(
      this.baseUrl,
      '/api/v2/access/authorize'
    );
    this.loginSubscription = this.http
      .post<{ access_token: string; expires_in: number }>(authUrl, {
        user: this.user,
        password: this.password,
      })
      .subscribe(
        (res) => {
          this.tokenService.token = res.access_token;
          this.router.navigate(['/answers']);
        },
        () => {
          this.invalid = true;
        }
      );
  }

  ngOnInit() {}
}
