import { Router } from '@angular/router';
import { TokenService } from './../../core/token/token.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private tokenService: TokenService, private router: Router) {}

  get observerGuideUrl() {
    return environment.observerGuideUrl;
  }

  get userName() {
    return this.tokenService.userName;
  }

  ngOnInit() {}

  isLoggedIn() {
    return this.tokenService.isloggedIn();
  }

  logout() {
    this.tokenService.token = undefined;
    this.router.navigate(['/login']);
  }
}
