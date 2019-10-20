import { StatisticsStateItem } from '../../store/statistics/statistics.state';

import { LoadStatisticAction } from '../../store/statistics/statistics.actions';
import { AppState } from '../../store/store.module';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, values } from 'lodash';
import { concatMap, take } from 'rxjs/operators';
import { from, of } from 'rxjs';

@Injectable()
export class LoadStatisticsGuard implements CanActivate {
  constructor(private store: Store<AppState>) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.params.key) {
      this.store
          .select(s => s.statistics[route.params.key]).pipe(
        take(1),
        map(s => new LoadStatisticAction(s.key, 1, 20, true)))
          .subscribe(a => this.store.dispatch(a as any));
    } else {
      this.store
          .select(s => s.statistics).pipe(
        take(1),
        // .do(console.log)
        map(s => values(s)),
        concatMap(s => from(s as any)),
        // .do(console.log)
        map((i: StatisticsStateItem) => new LoadStatisticAction(i.key, 1, 5, true)))
          .subscribe(a => this.store.dispatch(a as any));
    }
    return of(true);
  }
}
