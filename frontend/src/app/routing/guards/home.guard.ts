import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class HomeGuard implements CanActivate
{
    constructor(private router:Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.router.navigate(['/urgente'],{
            queryParams: {
                urgente: true
            }
        })
        return false;
    }
}