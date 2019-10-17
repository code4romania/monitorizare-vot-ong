import {Injectable} from '@angular/core';
import {ApiService} from 'app/core/apiService/api.service';
import {Observer} from '../models/observer.model';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class ObserversService {

  constructor(private http: ApiService, private httpClient: HttpClient) {
  }

  addNewObserver(observer: Observer) {
    return this.http.post(`/api/v1/observer?Phone=${observer.phone}&Pin=${observer.pin}&Name=${observer.name}&SendSMS=${observer.sendSMS}`, observer);
  }

  saveChanges(observer: Observer, info: Observer,) {
    return this.http.put('/api/v1/observer', {...observer, idObserver: info.id});
  }

  deleteObserver(id: string) {
    return this.http.delete(`/api/v1/observer?id=${id}`);
  }

  resetPasswordObserver(phone) {
    return this.http.post('/api/v1/observer/reset', {action: 'reset', phone});
  }

  getObserver(id: string) {
    return this.http.get(`/api/v1/observer?Number=${id}`);
  }

  uploadCsv(formData: any) {
    return this.http.post<any>(`/api/v1/observer/import`, formData);
  }

}
