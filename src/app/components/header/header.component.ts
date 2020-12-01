import { Router } from '@angular/router';
import { TokenService } from '../../core/token/token.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/user/user.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isHamburgerClicked = false;

  constructor(
    private tokenService: TokenService,
    private translateService: TranslateService,
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

  getAvailableLanguages() {
    return this.translateService.getLangs();
  }

  setLanguage(language: string) {
    localStorage.setItem('language', language);
    this.translateService.use(language);
    this.translateService.setDefaultLang(language);
    const prev = this.router.url;
    this.router.navigate(['/']).then(_ => {
      this.router.navigate([prev]);
    });
  }

  logout() {
    this.tokenService.token = undefined;
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
