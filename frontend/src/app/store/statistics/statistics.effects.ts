import { StatisticsState } from './statistics.state';
import { Store } from '@ngrx/store';
import { AppState } from '../store.module';
import { shouldLoadPage } from '../../shared/pagination.service';
import { GroupedObservable } from 'rxjs/operator/groupBy';
import { Observable, Subscription } from 'rxjs/Rx';
import { statisticsConfig } from './statistics.config';
import { LoadStatisticAction, LoadStatisticsCompleteAction, StatisticsActions } from './statistics.actions';
import { ApiService } from '../../core/apiService/api.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
@Injectable()
export class StatisticsEffects {

    state: StatisticsState;
    constructor(private http: ApiService, private actions: Actions, private store: Store<AppState>) {
        store.select(s => s.statistics).subscribe(s => this.state = s)
    }


    @Effect()
    loadStats = this.actions
        .ofType(StatisticsActions.LOAD)
        .map(a => <LoadStatisticAction>a)
        .filter((a: LoadStatisticAction) => shouldLoadPage(a.payload.page, a.payload.pageSize, this.state[a.payload.key].values.length))
        .groupBy(a => a.payload.key)
        .flatMap((obs) =>
            obs.switchMap((a) =>
                this.http.get(`/api/v1/statistici/${statisticsConfig.find(value => value.key === a.payload.key).method}`, {
                    body: {
                        page: a.payload.page,
                        pageSize: a.payload.pageSize
                    }
                }).map(res => {
                    return {
                        key: a.payload.key,
                        json: res.json()
                    }
                }))
        )
        // .switchMap((a: any) =>
        //     this.http.get(`/api/v1/statistici/${statisticsConfig.find(value => value.key === a.payload.key).method}`, {
        //         body: {
        //             page: a.payload.page,
        //             pageSize: a.payload.pageSize
        //         }
        //     }).map(res => {
        //         return {
        //             key: a.payload.key,
        //             json: res.json()
        //         }
        //     })

        // )

        .map(value => new LoadStatisticsCompleteAction(value.key, value.json.data, value.json.totalPages, value.json.totalItems))
}