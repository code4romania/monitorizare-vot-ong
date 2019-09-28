import {ObserversState} from './observers.state';
import {Store} from '@ngrx/store';
import {AppState} from '../store.module';
import {shouldLoadPage} from '../../shared/pagination.service';
import {observersConfig} from './observers.config';
import {LoadObserversAction, LoadObserversCompleteAction, ObserversActions} from './observers.actions';
import {ApiService} from '../../core/apiService/api.service';
import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {LabelValueModel} from '../../models/labelValue.model';

@Injectable()
export class ObserversEffects {
    state: ObserversState;
    constructor(private http: ApiService, private actions: Actions, private store: Store<AppState>) {
        store.select(s => s.statistics).subscribe(s => this.state = s)
    }


    @Effect()
    loadStats = this.actions
        .ofType(ObserversActions.LOAD)
        .map(a => <LoadObserversAction>a)
        .filter((a: LoadObserversAction) => shouldLoadPage(a.payload.page, a.payload.pageSize, this.state[a.payload.key].values.length))
        .groupBy(a => a.payload.key)
        .flatMap((obs) =>
            obs.switchMap((a) =>
                this.http.get<{
                  data: LabelValueModel[],
                  totalPages: number,
                  totalItems: number
                }>(`/api/v1/observatori/${observersConfig.find(value => value.key === a.payload.key).method}`, {
                    body: {
                        page: a.payload.page,
                        pageSize: a.payload.pageSize
                    }
                }).map(res => {
                    return {
                        key: a.payload.key,
                        json: res
                    }
                }))
        )

        .map(value => new LoadObserversCompleteAction(value.key, value.json.data, value.json.totalPages, value.json.totalItems))
}
