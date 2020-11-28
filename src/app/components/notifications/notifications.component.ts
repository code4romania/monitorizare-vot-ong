import {Component, OnInit} from '@angular/core';
import {CountyPollingStationInfo, NotificationsService,} from '../../services/notifications.service';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {GlobalNotificationModel,} from '../../models/notification.model';
import {TranslateService} from '@ngx-translate/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ObserversService} from '../../services/observers.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
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
    private notificationsService: NotificationsService,
    private observersService: ObserversService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.notificationsService
      .getCounties()
      .subscribe((res) => (this.counties = res));

    this.observersService.countObservers()
      .subscribe(count => this.observerCount = count);

    this.notificationForm = new FormGroup({
      notificationTitle: new FormControl('', [Validators.required]),
      notificationMessage: new FormControl('', [Validators.required])
    });
  }

  get notificationTitle() {
    return this.notificationForm.get('notificationTitle');
  }

  get notificationMessage() {
    return this.notificationForm.get('notificationMessage');
  }

  submitNotification() {
    // TODO: change channel and from
    this.notificationFormSubmitted = true;
    if (this.notificationForm.valid) {
      const count = this.usingObserverFilters ? this.filteredObserverIds?.length : this.observerCount;
      if (!confirm(this.translate.instant('NOTIFICATION_SEND_CONFIRMATION').replace('%d', count))) {
        return;
      }

      const notification = this.createGlobalNotification();
      if (this.usingObserverFilters) {
        this.notificationsService
          .pushNotification({...notification, recipients: this.filteredObserverIds})
          .subscribe(console.log);
      } else {
        this.notificationsService
          .pushNotificationGlobally(notification)
          .subscribe(console.log);
      }
    }
  }

  private createGlobalNotification(): GlobalNotificationModel {
    return {
      channel: 'Firebase',
      from: 'Monitorizare Vot',
      message: this.notificationMessage.value,
      title: this.notificationTitle.value,
    };
  }

  searchForObservers() {
    this.usingObserverFilters = true;
    const from = parseInt(this.pollingStationFrom, 10) || 1;
    const to = parseInt(this.pollingStationTo, 10) || this.maxPollingStationNumber;

    this.notificationsService
      .getActiveObserversInCounties(this.selectedCounties.map(c => c.code), from, to)
      .subscribe((res) => {
        this.filteredObserverIds = res.map(o => o.id);
      });
  }

  resetFilteredObservers() {
    this.filteredObserverIds = null;
  }

  changeCountyFilter() {
    this.pollingStationFrom = '';
    this.pollingStationTo = '';
    this.resetFilteredObservers();
    if (this.selectedCounties.length) {
      this.usingObserverFilters = true;
      this.maxPollingStationNumber =
        this.counties.find(c => c.code === this.selectedCounties[0].code)?.limit;
    } else {
      this.usingObserverFilters = false;
    }
  }

  resetFilter() {
    this.selectedCounties = [];
    this.changeCountyFilter();
    this.usingObserverFilters = false;
  }
}
