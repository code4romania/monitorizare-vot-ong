import {take} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ApiService, QueryParamBuilder} from '../core/apiService/api.service';
import {Observable} from 'rxjs';
import {GlobalNotificationModel, NotificationModel,} from '../models/notification.model';
import {environment} from 'src/environments/environment';
import {Location} from '@angular/common';
import {Observer} from '../models/observer.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private baseUrl: string;

  constructor(private http: ApiService) {
    this.baseUrl = environment.apiUrl;
  }

  public pushNotification(notification: NotificationModel): Observable<any> {
    const url: string = Location.joinWithSlash(this.baseUrl, '/api/v1/notification/send');
    return this.http.post(url, notification).pipe(take(1));
  }

  public pushNotificationGlobally(notification: GlobalNotificationModel): Observable<any> {
    const url: string = Location.joinWithSlash(this.baseUrl, '/api/v1/notification/send/all');
    return this.http.post(url, notification).pipe(take(1));
  }

  public getCounties(): Observable<CountyPollingStationInfo[]> {
    const url: string = Location.joinWithSlash(
      this.baseUrl,
      '/api/v1/polling-station'
    );
    return this.http.get<CountyPollingStationInfo[]>(url).pipe(take(1));
  }

  public getActiveObserversInCounties(
    counties: string[],
    fromPollingStationNumber: number,
    toPollingStationNumber: number
  ): Observable<Observer[]> {
    const urlWithParams = QueryParamBuilder.Instance('/api/v1/observer/active')
      .withParam('countyCodes', counties)
      .withParam('fromPollingStationNumber', fromPollingStationNumber)
      .withParam('toPollingStationNumber', toPollingStationNumber)
      .withParam('currentlyCheckedIn', true)
      .build();

    const url: string = Location.joinWithSlash(this.baseUrl, urlWithParams);
    return this.http.get<Observer[]>(url).pipe(take(1));
  }
}

export interface CountyPollingStationInfo {
  id: number;
  name: string;
  code: string;
  limit: number;
}
