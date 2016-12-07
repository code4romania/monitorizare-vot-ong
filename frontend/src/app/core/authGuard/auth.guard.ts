import { TokenService } from '../token/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivateChild, CanActivate {

    private static authObservable: Observable<boolean>;

    constructor(private tokenService: TokenService, private router:Router) { }


    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // check if this route
        return this.checkForLogin();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkForLogin();
    }

    private checkForLogin(): Promise<boolean> | boolean {
        if (this.tokenService.token) {
            return true;
        }
        this.router.navigate(['/login'])
        return false;
    }
}