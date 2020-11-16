import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of as observableOf } from 'rxjs';
import { catchError, groupBy, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ApiService } from '../../core/apiService/api.service';
import { NgoModel } from '../../models/ngo.model';
import { AppState } from '../store.module';
import { DeleteNgoAction, LoadNgosAction, LoadNgosCompleteAction, LoadNgosErrorAction, NgosActions } from './ngos.actions';
import { ngosConfig } from './ngos.config';
import { NgosState } from './ngos.state';

@Injectable()
export class NgosEffects {
  state: NgosState;
  private baseUrl: string;

  constructor(
    private http: ApiService,
    private actions: Actions,
    private store: Store<AppState>
  ) {
    store.pipe(select((s) => s.ngos)).subscribe((s) => (this.state = s));
    this.baseUrl = environment.apiUrl;
  }

  @Effect()
  loadNgos = this.actions.pipe(
    ofType(NgosActions.LOAD),
    map((a) => a as LoadNgosAction),
    groupBy((a) => a.payload.key),
    mergeMap((obs) =>
      obs.pipe(
        switchMap((a) => {
          const url: string = Location.joinWithSlash(
            this.baseUrl,
            `/api/v1/ngo${ngosConfig.find((value) => value.key === a.payload.key).method}`
          );

          return this.http
            .get<{
              data: NgoModel[];
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
      return new LoadNgosCompleteAction(
        value.key,
        value.json
      );
    }),
    catchError((err) => observableOf(new LoadNgosErrorAction(err)))
  );

  @Effect()
  deleteNgo = this.actions.pipe(
    ofType(NgosActions.DELETE),
    map((a) => a as DeleteNgoAction),
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
              data: NgoModel[];
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
    mapTo(new LoadNgosAction('ngos')),
    catchError((err) => observableOf(new LoadNgosErrorAction(err)))
  );
}