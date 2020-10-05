import { switchMap, mergeMap, groupBy, filter, map } from 'rxjs/operators';
import { StatisticsState } from './statistics.state';
import { Store } from '@ngrx/store';
import { AppState } from '../store.module';
import { shouldLoadPage } from '../../shared/pagination.service';
import { statisticsConfig } from './statistics.config';
import {
  LoadStatisticAction,
  LoadStatisticsCompleteAction,
  StatisticsActions,
} from './statistics.actions';
import { ApiService } from '../../core/apiService/api.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { LabelValueModel } from '../../models/labelValue.model';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
@Injectable()
export class StatisticsEffects {
  private baseUrl: string;

  state: StatisticsState;
  constructor(
    private http: ApiService,
    private actions: Actions,
    private store: Store<AppState>
  ) {
    this.baseUrl = environment.apiUrl;

    store.select((s) => s.statistics).subscribe((s) => (this.state = s));
  }

  @Effect()
  loadStats = this.actions.pipe(
    ofType(StatisticsActions.LOAD),
    map((a) => a as LoadStatisticAction),
    filter((a: LoadStatisticAction) =>
      shouldLoadPage(
        a.payload.page,
        a.payload.pageSize,
        this.state[a.payload.key].values.length
      )
    ),
    groupBy((a) => a.payload.key),
    mergeMap((obs) =>
      obs.pipe(
        switchMap((a) => {
          const statisticsUrl: string = Location.joinWithSlash(
            this.baseUrl,
            `/api/v1/statistics/${
              statisticsConfig.find((value) => value.key === a.payload.key)
                .method
            }`
          );

          return this.http
            .get<{
              data: LabelValueModel[];
              totalPages: number;
              totalItems: number;
            }>(statisticsUrl, {
              body: {
                page: a.payload.page,
                pageSize: a.payload.pageSize,
              },
            })
            .pipe(
              map((res) => {
                return {
                  key: a.payload.key,
                  json: res,
                };
              })
            );
        })
      )
    ),
    map(
      (value) =>
        new LoadStatisticsCompleteAction(
          value.key,
          value.json.data,
          value.json.totalPages,
          value.json.totalItems
        )
    )
  );
}
