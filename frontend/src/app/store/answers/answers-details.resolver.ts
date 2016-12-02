import { Injectable } from '@angular/core';
import { ANSWERS_DETAIL_LOAD } from './answers.actions';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Resolve } from '@angular/router/src/interfaces';
@Injectable()
export class AnswerDetailsResolver implements Resolve<boolean> {
    constructor(private store: Store<AppState>) { }
    resolve(route:  ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.store.dispatch({
            type: ANSWERS_DETAIL_LOAD,
            payload: {
                observerId: route.params['idObservator'],
                sectionId: route.params['idSectie']
            }
        });
        return true;
    }
}