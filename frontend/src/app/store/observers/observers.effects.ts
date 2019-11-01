import { ObserversState } from './observers.state';
import { Store } from '@ngrx/store';
import { AppState } from '../store.module';
import { shouldLoadPage } from '../../shared/pagination.service';
import { observersConfig } from './observers.config';
import {
  DeleteObserverAction,
  LoadObserversAction,
  LoadObserversCompleteAction,
  LoadObserversErrorAction,
  ObserversActions
} from './observers.actions';
import { ApiService } from '../../core/apiService/api.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from '../../models/observer.model';
import { Location } from '@angular/common';
import { environment } from 'environments/environment';

@Injectable()
export class ObserversEffects {
  state: ObserversState;
  private baseUrl: string;

  constructor(private http: ApiService, private actions: Actions, private store: Store<AppState>) {
    store.select(s => s.observers).subscribe(s => this.state = s)
    this.baseUrl = environment.apiUrl;
  }


  @Effect()
  loadStats = this.actions
    .ofType(ObserversActions.LOAD)
    .map(a => <LoadObserversAction>a)
    .filter((a: LoadObserversAction) => shouldLoadPage(a.payload.page, a.payload.pageSize, this.state[a.payload.key].values.length))
    .groupBy(a => a.payload.key)
    .flatMap((obs) =>
      obs.switchMap((a) => {
        const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/observer${observersConfig.find(value => value.key === a.payload.key).method}?Name=${a.payload.searchParamName}&Number=${a.payload.searchParamPhone}&Page=${a.payload.page}&PageSize=${a.payload.pageSize}`);

        return this.http.get<{
          data: Observer[],
          totalPages: number,
          totalItems: number
        }>(url).map(res => {
          return {
            key: a.payload.key,
            json: res
          }
        })
      }
      )
    )
    .map((value: any) => {
      return new LoadObserversCompleteAction(value.key, value.json.data, value.json.totalPages, value.json.totalItems);
    }
    )
    .catch((err) => Observable.of(new LoadObserversErrorAction(err)));


  @Effect()
  deleteObserver = this.actions
    .ofType(ObserversActions.DELETE)
    .map(a => <DeleteObserverAction>a)
    .groupBy(a => a.payload.key)
    .flatMap((obs) =>
      obs.switchMap((a) => {
        const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/observer?id=${a.payload.id}`);

        return this.http.get<{
          data: Observer[],
          totalPages: number,
          totalItems: number
        }>(url).map(res => {
          return {
            key: a.payload.key,
            json: res
          }
        });
      }
      )
    )
    .mapTo(new LoadObserversAction('observers', 1, 1000))
    .catch((err) => Observable.of(new LoadObserversErrorAction(err)));
}
