import { CountryActionTypes, CountryAnswersErrorAction, CountryAnswersSuccessAction, CountryPollingDeleteErrorAction, CountryPollingDeleteSuccessAction, CountryPollingDragAndDropErrorAction, CountryPollingDragAndDropSuccessAction, CountryPollingStationErrorAction, CountryPollingStationSuccessAction } from './county.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { ApiService } from '../../core/apiService/api.service';
import { environment } from '../../../environments/environment';
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { County } from './county.state';
import { Store } from '@ngrx/store';
import { AppState } from '../store.module';
import { getCounties } from './county.selectors';

@Injectable()
export class CountyEffects {
  private baseURL: string = environment.apiUrl;
  private fetchCountiesURL = this.baseURL + '/api/v1/county';

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<AppState>
  ) { }

  fetchCounties$ = createEffect(
    () => this.actions$.pipe(
      ofType(CountryActionTypes.FETCH_COUNTRIES_FROM_ANSWERS),
      withLatestFrom(this.store.select(getCounties)),
      filter(([, currentCounties]) => !!currentCounties === false),
      switchMap(
        () => this.apiService.get(this.fetchCountiesURL).pipe(
          map((counties: County[]) => new CountryAnswersSuccessAction(counties)),
          catchError((err) => of(new CountryAnswersErrorAction(err.message))
          )
        )
      ),
    )
  );

  @Effect() getPollingStations$ = this.actions$.pipe(
    ofType(CountryActionTypes.FETCH_COUNTRIES_FOR_POLLING_STATIONS),
    // withLatestFrom(this.store.select(getCounties)),
    switchMap(
      () => this.apiService.get(this.fetchCountiesURL).pipe(
        map((counties: County[]) => new CountryPollingStationSuccessAction(counties)),
        catchError((err) => of(new CountryPollingStationErrorAction(err.message))
        )
      )
    ),
  )

  @Effect() pollingStationsDragAndDrop$ = this.actions$
    .pipe(
      ofType(CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_DROP_AND_DROP_ORDER),
      switchMap((counties: County[]) =>
        this.apiService.post(this.fetchCountiesURL + '/update-order', { counties: counties }).pipe(
          map((counties: County[]) => new CountryPollingDragAndDropSuccessAction(counties)),
          catchError((err) => of(new CountryPollingDragAndDropErrorAction(err.message)))
        ))
    );

  @Effect() pollingStationsMoveToFirst$ = this.actions$
    .pipe(
      ofType(CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_MOVE_TO_FIRST),
      switchMap((county: County) =>
        this.apiService.post(this.fetchCountiesURL + '/move-to-first', { county: county }).pipe(
          map((counties: County[]) => new CountryPollingDragAndDropSuccessAction(counties)),
          catchError((err) => of(new CountryPollingDragAndDropErrorAction(err.message)))
        ))
    );

  @Effect() pollingStationsDeleteCounty$ = this.actions$
    .pipe(
      ofType(CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_DELETE),
      switchMap((county: County) =>
        this.apiService.post(this.fetchCountiesURL + '/delete', { county: county }).pipe(
          map((counties: County[]) => new CountryPollingDeleteSuccessAction(counties)),
          catchError((err) => of(new CountryPollingDeleteErrorAction(err.message)))
        ))
    );

}