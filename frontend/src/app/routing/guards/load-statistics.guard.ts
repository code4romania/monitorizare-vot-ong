import { Observable, Observer } from 'rxjs/Rx';
import { LoadStatisticAction } from '../../store/statistics/statistics.actions';
import { AppState } from '../../store/store.module';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { each } from 'lodash';
@Injectable()
export class LoadStatisticsGuard implements CanActivate {
    constructor(private store: Store<AppState>) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create((obs: Observer<boolean>) => {
            this.store.select(state => state.statistics).take(1)
                .subscribe(state => {
                    each(state, stateItem => this.store.dispatch(new LoadStatisticAction(stateItem.key, 1, 5, true)))

                    obs.next(true)
                })
        })
    }
}