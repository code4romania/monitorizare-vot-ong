import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/apiService/api.service';
import { of } from 'rxjs/observable/of';
import {Observer} from '../models/observer.model';

@Injectable()
export class ObserversService {

  constructor(private http: ApiService) { }

  addNewObserver(observer: Observer) {
    // return this.http.post('/observers', observer);
    return of(null);
  }

  saveChanges(observer: Observer) {
    // return this.http.put('/observers/${id}`', observer);
    return of(null);
  }

  getObserver(id: string) {
    // return this.http.get(`/observers/${id}`, observer);
    return of(null);
  }

}
