import { AuthentificationService } from '../../core/authentification/authentification.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivateChild, CanActivate {

    private static authObservable: Observable<boolean>;

    constructor(private authService: AuthentificationService) { }


    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // check if this route
        return this.checkForLogin();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkForLogin();
    }

    private checkForLogin(): boolean | Observable<boolean> {
        if (this.authService.isLoggedIn) {
            return true;
        }
        
        if (!AuthGuard.authObservable) {
            AuthGuard.authObservable = this.authService.login('admin', 'admin').mapTo(true).share();
        }
        return AuthGuard.authObservable;


    }
}