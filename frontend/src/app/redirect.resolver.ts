import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationExtras, Router } from '@angular/router';
import { Resolve } from '@angular/router/src/interfaces';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class HomeRedirectResolver implements Resolve<any> {
    constructor(private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        this.router.navigate(['/raspunsuri/urgente']);
        return null;
    }
}