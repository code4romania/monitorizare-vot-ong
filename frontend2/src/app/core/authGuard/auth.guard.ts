import { TokenService } from '../token/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  private static authObservable: Observable<boolean>;

  constructor(private tokenService: TokenService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkForLogin();
  }

  private checkForLogin(): Promise<boolean> | boolean {
    if (this.tokenService.token) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
