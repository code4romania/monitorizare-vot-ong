import { CountryActionTypes, CountryAnswersErrorAction, CountryAnswersSuccessAction, CountryPollingStationErrorAction, CountryPollingStationSuccessAction } from './county.actions';
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
    switchMap(
      () => this.apiService.get(this.fetchCountiesURL).pipe(
        map((counties: County[]) => new CountryPollingStationSuccessAction(counties)),
        catchError((err) => of(new CountryPollingStationErrorAction(err.message))
        )
      )
    ),
  )

}