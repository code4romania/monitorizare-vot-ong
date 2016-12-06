import { Observable } from 'rxjs/Rx';
import { statisticsConfig } from './statistics.config';
import { LoadStatisticAction, LoadStatisticsCompleteAction, StatisticsActions } from './statistics.actions';
import { ApiService } from '../../core/apiService/api.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
@Injectable()
export class StatisticsEffects {

    constructor(private http: ApiService, private actions: Actions) {

    }
    

    @Effect()
    loadStats = this.actions
        .ofType(StatisticsActions.LOAD)
        .flatMap((action: LoadStatisticAction) => 
            this.http.get(`/api/v1/statistici/${statisticsConfig.find(value => value.key === action.payload.key).method}`, {
                body: {
                    page: action.payload.page,
                    pageSize: action.payload.pageSize
                }
            }).map(res => {
                return {
                    key: action.payload.key,
                    json: res.json()
                }
            })
        )
        .map(value => new LoadStatisticsCompleteAction(value.key,value.json.data,value.json.totalPages, value.json.totalItems))
}