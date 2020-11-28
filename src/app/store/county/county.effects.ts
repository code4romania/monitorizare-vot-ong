import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchCountiesFromAnswers, fetchCountriesFailure, fetchCountriesSuccess } from './county.actions';
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
  
  fetchCounties$ = createEffect(
    () => this.actions$.pipe(
      ofType(fetchCountiesFromAnswers),
      withLatestFrom(this.store.select(getCounties)),
      filter(([, currentCounties]) => !!currentCounties === false),
      switchMap(
          () => this.apiService.get(this.fetchCountiesURL).pipe(
            map((counties: County[]) => fetchCountriesSuccess({ counties })),
            catchError((err) => of(fetchCountriesFailure({ errorMessage: err.message }))
          )
        )
      ),
    )
  );

  constructor (
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<AppState>
  ) { }
}