import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/store.module';
import {NotificationsActions} from '../../../store/notifications/notifications.actions';
import {NotificationsState, selectNotifications} from '../../../store/notifications/notifications.state';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {TableColumn, TableColumnTranslated} from '../../../table/table.model';

const DEFAULT_PAGE_SIZE = 10;
const TABLE_COLUMNS: TableColumn[] = [
  { name: 'SENT_BY', propertyName: 'senderAccount'},
  { name: 'NGO', propertyName: 'senderNgoName'},
  { name: 'TITLE', propertyName: 'title'},
  { name: 'MESSAGE', propertyName: 'body'},
  { name: 'SENT_TO', propertyName: 'sentObserverIds'},
  { name: 'SENT_AT', propertyName: 'insertedAt'}
];

@Component({
  selector: 'app-notification-history',
  templateUrl: './notification-history.component.html',
  styleUrls: ['./notification-history.component.scss'],
})
export class NotificationHistoryComponent implements OnInit {
  tableColumns: TableColumnTranslated[] = [];
  notificationState$: Observable<NotificationsState>;

  constructor(
    private store: Store<AppState>,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.loadNotifications(1);
    this.notificationState$ = this.store.select(selectNotifications);
    this.tableColumns = TABLE_COLUMNS.map(
      ({name, ...rest}) => ({ ...rest, name: this.translateService.get(name)}));
  }

  private loadNotifications(page: number) {
    this.store.dispatch(NotificationsActions.load({page, pageSize: DEFAULT_PAGE_SIZE}))
  }

  pageChanged(e) {
    this.loadNotifications(e.page);
  }
}
