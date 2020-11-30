import { TokenService } from '../token/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    private static authObservable: Observable<boolean>;

    constructor(private tokenService: TokenService, private router: Router) { }
    
    canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
        return this.checkForLogin();
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
