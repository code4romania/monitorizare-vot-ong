import {Component, OnInit} from '@angular/core';
import {CountyPollingStationInfo, NotificationsService,} from '../../services/notifications.service';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {GlobalNotificationModel,} from '../../models/notification.model';
import {Observer} from '../../models/observer.model';
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
  filteredObserverIds: string[] = [];
  notificationForm: FormGroup;
  submitted = false;
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
    this.submitted = true;
    if (this.notificationForm.valid) {
      const message = this.translate.instant('NOTIFICATION_SEND_CONFIRMATION');
      const count = this.filteredObserverIds?.length || this.observerCount;

      if (!confirm(message.replace('%d', count))) {
        return;
      }

      const notification = this.createGlobalNotification();
      if (this.filteredObserverIds?.length) {
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
    const from = parseInt(this.pollingStationFrom, 10);
    const to = parseInt(this.pollingStationTo, 10);

    this.notificationsService
      .getActiveObserversInCounties(
        this.selectedCounties.map(c => c.code),
        from,
        to
      )
      .subscribe((res) => {
        this.filteredObserverIds = res.map(o => o.id);
      });
  }

  resetFilteredObservers() {
    this.filteredObserverIds = [];
  }

  changeCountyFilter() {
    this.pollingStationFrom = '';
    this.pollingStationTo = '';
    this.resetFilteredObservers();
    if (this.selectedCounties.length) {
      this.maxPollingStationNumber =
        this.counties.find(c => c.code === this.selectedCounties[0].code)?.limit;
    }
  }

  resetFilter() {
    this.selectedCounties = [];
    this.changeCountyFilter();
  }
}
