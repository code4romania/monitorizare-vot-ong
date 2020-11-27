import {Component, OnInit} from '@angular/core';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {FormGroup} from '@angular/forms';
import {CountyPollingStationInfo} from '../../../services/notifications.service';
import {TableColumn, TableColumnTranslated} from '../../../table/table-container/table-container.component';
import {HistoryNotificationModel} from '../../../models/notification.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/store.module';
import {NotificationsActions} from '../../../store/notifications/notifications.actions';
import {NotificationsState, selectNotifications} from '../../../store/notifications/notifications.state';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

const DEFAULT_PAGE_SIZE = 100;
const TABLE_COLUMNS = [
  { name: 'SENT_BY', propertyName: 'senderAccount'},
  { name: 'NGO', propertyName: 'senderNgoName'},
  { name: 'TITLE', propertyName: 'title'},
  { name: 'MESSAGE', propertyName: 'body'},
  { name: 'DATE', propertyName: 'insertedAt'}
];

@Component({
  selector: 'app-notification-history',
  templateUrl: './notification-history.component.html',
  styleUrls: ['./notification-history.component.scss'],
})
export class NotificationHistoryComponent implements OnInit {
  tableColumns: TableColumnTranslated[] = [];
  notificationList: HistoryNotificationModel[];
  notificationState$: Observable<NotificationsState>;

  counties: CountyPollingStationInfo[] = [];
  pollingStationFrom = '';
  pollingStationTo = '';
  selectedCounties: { code: string; name: string }[] = [];
  filteredObserverIds: string[] = null;
  usingObserverFilters = false;
  notificationForm: FormGroup;
  notificationFormSubmitted = false;
  observerCount: number;
  maxPollingStationNumber: number;

  countyDropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'code',
    textField: 'name',
    itemsShowLimit: 10,
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };

  constructor(
    private store: Store<AppState>,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.loadNotifications(1);
    this.notificationState$ = this.store.select(selectNotifications);
  }

  private loadNotifications(page: number) {
    this.store.dispatch(NotificationsActions.load({page, pageSize: DEFAULT_PAGE_SIZE}))
  }

  pageChanged(e) {
    this.loadNotifications(e.page);
  }

  private translateColumnNames() {
    this.tableColumns = TABLE_COLUMNS.map(
      ({ name, ...rest }) => ({ ...rest, name: this.translateService.get(name) })
    );
  }
}
