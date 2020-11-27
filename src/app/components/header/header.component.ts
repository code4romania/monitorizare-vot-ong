import { Router } from '@angular/router';
import { TokenService } from './../../core/token/token.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isHamburgerClicked = false;
  
  constructor(
    private tokenService: TokenService, 
    private router: Router,
    private store: Store,
  ) {}

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
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
