import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/apiService/api.service';
import { Observer } from '../models/observer.model';
import { environment } from 'environments/environment';
import { Location } from '@angular/common';

@Injectable()
export class ObserversService {
  private baseUrl: string;

  constructor(private http: ApiService) {
    this.baseUrl = environment.apiUrl;
  }

  addNewObserver(observer: Observer) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/observer?Phone=${observer.phone}&Pin=${observer.pin}&Name=${observer.name}&SendSMS=${observer.sendSMS}`);
    return this.http.post(url, observer);
  }

  saveChanges(observer: Observer, info: Observer, ) {
    const url: string = Location.joinWithSlash(this.baseUrl, '/api/v1/observer');
    return this.http.put(url, { ...observer, idObserver: info.id });
  }

  deleteObserver(id: string) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/observer?id=${id}`);
    return this.http.delete(url);
  }

  resetPasswordObserver(phone: string, pin: string) {
    const url: string = Location.joinWithSlash(this.baseUrl, '/api/v1/observer/reset');
    return this.http.post(url, { action: 'reset-password', phoneNumber: phone, pin: pin });
  }

  getObserver(id: string) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/observer?Number=${id}`);
    return this.http.get(url);
  }

  uploadCsv(formData: any) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/observer/import`);
    return this.http.post<any>(url, formData);
  }

}
