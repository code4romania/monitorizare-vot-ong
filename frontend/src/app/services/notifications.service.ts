import {Injectable} from '@angular/core';
import {ApiService} from '../core/apiService/api.service';
import {Observable} from 'rxjs';

@Injectable()
export class NotificationsService {


  constructor(private http: ApiService) {
  }

  //TODO: Take 1
  public pushNotification(notification): Observable<any> {
    console.log(notification);
    return this.http.post<any>('/api/v1/notificari', notification);
  }
}
