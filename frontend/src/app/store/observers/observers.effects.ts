import {ObserversState} from './observers.state';
import {Store} from '@ngrx/store';
import {AppState} from '../store.module';
import {shouldLoadPage} from '../../shared/pagination.service';
import {observersConfig} from './observers.config';
import {LoadObserversAction, LoadObserversCompleteAction, LoadObserversErrorAction, ObserversActions} from './observers.actions';
import {ApiService} from '../../core/apiService/api.service';
import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {LabelValueModel} from '../../models/labelValue.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Observer} from '../../models/observer.model';

@Injectable()
export class ObserversEffects {
  state: ObserversState;

  constructor(private http: ApiService, private actions: Actions, private store: Store<AppState>) {
    store.select(s => s.observers).subscribe(s => this.state = s)
  }


  @Effect()
  loadStats = this.actions
    .ofType(ObserversActions.LOAD)
    .map(a => <LoadObserversAction>a)
    // .filter((a: LoadObserversAction) => shouldLoadPage(a.payload.page, a.payload.pageSize, this.state[a.payload.key].values.length))
    // .groupBy(a => a.payload.key)
    // .flatMap((obs) =>
    //     obs.switchMap((a) =>
    //         this.http.get<{
    //           data: LabelValueModel[],
    //           totalPages: number,
    //           totalItems: number
    //         }>(`/api/v1/observatori/${observersConfig.find(value => value.key === a.payload.key).method}`, {
    //             body: {
    //                 page: a.payload.page,
    //                 pageSize: a.payload.pageSize
    //             }
    //         }).map(res => {
    //             return {
    //                 key: a.payload.key,
    //                 json: res
    //             }
    //         }))
    // )
    .pipe(map(entry => {
      console.log('MAPPING', entry);
      return {
        key: entry.payload.key,
        json: {
          data: mockResponse.map(entry => new Observer(entry)),
          totalPages: 21,
          totalItems: 100
        }
      }
    }))
    .map(value => new LoadObserversCompleteAction(value.key, value.json.data, value.json.totalPages, value.json.totalItems))
    .catch((err) => Observable.of(new LoadObserversErrorAction(err)));

}

const mockResponse = [{
  'id': 1,
  'ngo': 'Ngo Test',
  'phone': '+40 785 864 545',
  'firstName': 'Adrian',
  'lastName': 'Petcu',
  'deviceRegisterDate': '2019-09-28T12:15:01.848Z',
  'lastSeen': '2019-09-28T12:15:01.848Z',
  'numberOfNotes': 1,
  'numberOfPollingStations': 0
}, {
  'id': 1,
  'ngo': 'Ngo Test',
  'phone': '+40 785 864 545',
  'firstName': 'Ion',
  'lastName': 'Popescu',
  'deviceRegisterDate': '2019-09-28T12:15:01.848Z',
  'lastSeen': '2019-09-28T12:15:01.848Z',
  'numberOfNotes': 1,
  'numberOfPollingStations': 0
}, {
  'id': 1,
  'ngo': 'Ngo Test',
  'phone': '+40 785 864 545',
  'firstName': 'Adrian',
  'lastName': 'Petcu',
  'deviceRegisterDate': '2019-09-28T12:15:01.848Z',
  'lastSeen': '2019-09-28T12:15:01.848Z',
  'numberOfNotes': 1,
  'numberOfPollingStations': 0
}, {
  'id': 1,
  'ngo': 'Ngo Test',
  'phone': '+40 785 864 545',
  'firstName': 'Ion',
  'lastName': 'Popescu',
  'deviceRegisterDate': '2019-09-28T12:15:01.848Z',
  'lastSeen': '2019-09-28T12:15:01.848Z',
  'numberOfNotes': 1,
  'numberOfPollingStations': 0
}, {
  'id': 1,
  'ngo': 'Ngo Test',
  'phone': '+40 785 864 545',
  'firstName': 'Adrian',
  'lastName': 'Petcu',
  'deviceRegisterDate': '2019-09-28T12:15:01.848Z',
  'lastSeen': '2019-09-28T12:15:01.848Z',
  'numberOfNotes': 1,
  'numberOfPollingStations': 0
}, {
  'id': 1,
  'ngo': 'Ngo Test',
  'phone': '+40 785 864 545',
  'firstName': 'Ion',
  'lastName': 'Popescu',
  'deviceRegisterDate': '2019-09-28T12:15:01.848Z',
  'lastSeen': '2019-09-28T12:15:01.848Z',
  'numberOfNotes': 1,
  'numberOfPollingStations': 0
}];
