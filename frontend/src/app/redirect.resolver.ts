import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationExtras, Router } from '@angular/router';
import { Resolve } from '@angular/router/src/interfaces';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class HomeRedirectResolver implements Resolve<any> {
    constructor(private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        let extras: NavigationExtras = {
            queryParams: {
                urgent: true
            },
            replaceUrl : true
        };
        this.router.navigate(['/raspunsuri'], extras );
        return null;
    }
}