import {delay, first, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ApiService, QueryParamBuilder} from '../core/apiService/api.service';
import {Observable, of} from 'rxjs';
import {
  HistoryNotificationModel,
  HistoryNotifications,
  SentGlobalNotificationModel,
  SentNotificationModel,
} from '../models/notification.model';
import {environment} from 'src/environments/environment';
import {Location} from '@angular/common';
import {Observer} from '../models/observer.model';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class NotificationsService {
  private baseUrl: string;

  constructor(private http: ApiService) {
    this.baseUrl = environment.apiUrl;
  }

  public getAll(page, pageSize = 100): Observable<HistoryNotifications> {
    const url = Location.joinWithSlash(this.baseUrl, '/api/v1/notification/get/all');
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    // return this.http.get<HistoryNotifications>(url, {params}).pipe(first());
    return of({
      ...mockNotifications, totalPages: Math.ceil(mockNotifications.data.length/pageSize),
      page, pageSize
    } as HistoryNotifications).pipe(delay(200));
  }

  public pushNotification(notification: SentNotificationModel): Observable<any> {
    const url: string = Location.joinWithSlash(this.baseUrl, '/api/v1/notification/send');
    return this.http.post(url, notification).pipe(take(1));
  }

  public pushNotificationGlobally(notification: SentGlobalNotificationModel): Observable<any> {
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

const mockNotifications = {
  data: [
    {
      id: 7,
      title: 'minim ad nostrud',
      body: 'culpa non laboris fugiat nisi et aliqua proident proident est anim esse',
      channel: 'Firebase',
      insertedAt: '2011-06-21T12:31:49+00:00',
      senderNgoName: 'Assurity',
      senderAccount: 'Emilia Carson'
    },
    {
      id: 42,
      title: 'cupidatat elit sit',
      body: 'nulla adipisicing quis nostrud occaecat officia occaecat deserunt ad enim laboris officia',
      channel: 'Firebase',
      insertedAt: '1972-06-03T03:32:57+00:00',
      senderNgoName: 'Terascape',
      senderAccount: 'Neva Clemons'
    },
    {
      id: 51,
      title: 'minim ipsum id',
      body: 'quis et nostrud est dolor sunt do cillum exercitation est elit voluptate',
      channel: 'Firebase',
      insertedAt: '2012-10-10T10:32:18+00:00',
      senderNgoName: 'Roughies',
      senderAccount: 'Mari Wheeler'
    },
    {
      id: 5,
      title: 'laborum est et',
      body: 'incididunt labore anim non proident dolore excepteur incididunt et exercitation sit sunt',
      channel: 'Firebase',
      insertedAt: '1970-03-19T19:13:40+00:00',
      senderNgoName: 'Urbanshee',
      senderAccount: 'Harris Baker'
    },
    {
      id: 88,
      title: 'Lorem consequat qui',
      body: 'non tempor duis eu non voluptate exercitation enim cillum occaecat voluptate est',
      channel: 'Firebase',
      insertedAt: '2017-04-27T19:55:10+00:00',
      senderNgoName: 'Apextri',
      senderAccount: 'Harper Frank'
    }
  ],
  totalItems: 5,
  totalPages: 1,
  page: 1,
  pageSize: 100
};
