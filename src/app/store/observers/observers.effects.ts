import { of as observableOf} from 'rxjs';

import {
  mapTo,
  switchMap,
  catchError,
  mergeMap,
  groupBy,
  filter,
  map,
} from 'rxjs/operators';
import { ObserversState, ObserversCountState } from './observers.state';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store.module';
import { shouldLoadPage } from '../../shared/pagination.service';
import { observersConfig } from './observers.config';
import {
  DeleteObserverAction,
  LoadObserversAction,
  LoadObserversCompleteAction,
  LoadObserversErrorAction,
  ObserversActions,
  LoadObserversCountCompleteAction,
} from './observers.actions';
import { ApiService } from '../../core/apiService/api.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observer } from '../../models/observer.model';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable()
export class ObserversEffects {
  state: ObserversState;
  private baseUrl: string;

  constructor(
    private http: ApiService,
    private actions: Actions,
    private store: Store<AppState>
  ) {
    store.pipe(select((s) => s.observers)).subscribe((s) => (this.state = s));
    this.baseUrl = environment.apiUrl;
  }

  @Effect()
  loadStats = this.actions.pipe(
    ofType(ObserversActions.LOAD),
    map((a) => a as LoadObserversAction),
    filter((a: LoadObserversAction) =>
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
          const url: string = Location.joinWithSlash(
            this.baseUrl,
            `/api/v1/observer${
              observersConfig.find((value) => value.key === a.payload.key)
                .method
            }?Name=${a.payload.searchParamName}&Number=${
              a.payload.searchParamPhone
            }&Page=${a.payload.page}&PageSize=${a.payload.pageSize}`
          );

          return this.http
            .get<{
              data: Observer[];
              totalPages: number;
              totalItems: number;
            }>(url)
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
    map((value: any) => {
      return new LoadObserversCompleteAction(
        value.key,
        value.json.data,
        value.json.totalPages,
        value.json.totalItems
      );
    }),
    catchError((err) => observableOf(new LoadObserversErrorAction(err)))
  );

  @Effect()
  deleteObserver = this.actions.pipe(
    ofType(ObserversActions.DELETE),
    map((a) => a as DeleteObserverAction),
    groupBy((a) => a.payload.key),
    mergeMap((obs) =>
      obs.pipe(
        switchMap((a) => {
          const url: string = Location.joinWithSlash(
            this.baseUrl,
            `/api/v1/observer?id=${a.payload.id}`
          );

          return this.http
            .get<{
              data: Observer[];
              totalPages: number;
              totalItems: number;
            }>(url)
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
    mapTo(new LoadObserversAction('observers', 1, 1000)),
    catchError((err) => observableOf(new LoadObserversErrorAction(err)))
  );
}

@Injectable()
export class ObserversCountEffects {
  state: ObserversCountState;
  private baseUrl: string;

  constructor(
    private http: ApiService,
    private actions: Actions,
    private store: Store<AppState>
  ) {
    store
      .pipe(select((s) => s.observersCount))
      .subscribe((s) => (this.state = s));
    this.baseUrl = environment.apiUrl;
  }

  @Effect()
  loadStats = this.actions.pipe(
    ofType(ObserversActions.LOADOBSERVERSTOTALCOUNT),
    switchMap((obs) => {
      const url: string = Location.joinWithSlash(
        this.baseUrl,
        `/api/v1/observer/count`
      );

      return this.http.get<number>(url).pipe(map((res) => res));
    }),
    map((value: any) => {
      return new LoadObserversCountCompleteAction(value);
    }),
    catchError((err) => observableOf(new LoadObserversErrorAction(err)))
  );
}
