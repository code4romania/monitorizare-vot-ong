import { TokenService } from './token/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class AnonGuard implements CanActivate {
    constructor(private tokenService: TokenService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return !this.tokenService.token;
    }
}
