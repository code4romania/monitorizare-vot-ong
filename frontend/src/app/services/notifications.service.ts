import {Injectable} from '@angular/core';
import {ApiService} from '../core/apiService/api.service';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {NotificationModel} from '../models/notification.model';

@Injectable()
export class NotificationsService {


  constructor(private http: ApiService) {
  }

  public pushNotification(notification: NotificationModel): Observable<any> {
    return this.http.post<any>('/api/v1/notificari', notification).take(1);
  }

  public getCounties(): Observable<string[]> {
    return this.http.get<string[]>('/api/v1/judete').take(1);
  }

  public getObserversCountiesObservers(counties: string[]): Observable<string[]> {
    return this.http.get<string[]>(`/api/v1/judete?counties=[${counties}]`).take(1);
  }

  public getObserversCountiesPollingStations(counties: string[]): Observable<string[]> {
    return this.http.get<string[]>(`/api/v1/polling-stations?counties=[${counties}]`).take(1);
  }
}
