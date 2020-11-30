import {Injectable} from '@angular/core';
import {ApiService} from '../core/apiService/api.service';
import {Observer} from '../models/observer.model';
import {environment} from 'src/environments/environment';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';

@Injectable()
export class ObserversService {
  private baseUrl: string;

  constructor(private http: ApiService) {
    this.baseUrl = environment.apiUrl;
  }

  addNewObserver(observer: Observer) {
    const url: string = Location.joinWithSlash(
      this.baseUrl,
      `/api/v1/observer?Phone=${observer.phone}&Pin=${observer.pin}&Name=${observer.name}&SendSMS=${observer.sendSMS}`
    );
    return this.http.post(url, observer);
  }

  saveChanges(observer: { [k: string]: any }, info: Observer) {
    const url: string = Location.joinWithSlash(
      this.baseUrl,
      '/api/v1/observer'
    );
    return this.http.put(url, { ...observer, idObserver: info.id });
  }

  deleteObserver(id: string) {
    const url: string = Location.joinWithSlash(
      this.baseUrl,
      `/api/v1/observer?id=${id}`
    );
    return this.http.delete(url);
  }

  resetPasswordObserver(phone: string, pin: string) {
    const url: string = Location.joinWithSlash(
      this.baseUrl,
      '/api/v1/observer/reset'
    );
    return this.http.post(url, {
      action: 'reset-password',
      phoneNumber: phone,
      pin,
    });
  }

  getObserver(id: string) {
    const url: string = Location.joinWithSlash(
      this.baseUrl,
      `/api/v1/observer?Number=${id}`
    );
    return this.http.get(url);
  }

  countObservers(): Observable<number> {
    const url = Location.joinWithSlash(this.baseUrl, '/api/v1/observer/count');
    return this.http.get<number>(url).pipe(first());
  }

  uploadCsv(formData: any) {
    const url: string = Location.joinWithSlash(
      this.baseUrl,
      `/api/v1/observer/import`
    );
    return this.http.post<any>(url, formData);
  }
}
