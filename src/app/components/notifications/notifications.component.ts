import {Component, OnInit} from '@angular/core';
import {CountyPollingStationInfo, NotificationsService,} from '../../services/notifications.service';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {GlobalNotificationModel, NotificationModel,} from '../../models/notification.model';
import {Observer} from '../../models/observer.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notificationTitle: string;
  message: string;
  counties: CountyPollingStationInfo[] = [];
  pollingStations = [];
  pollingStationFrom = [];
  pollingStationTo = [];
  selectedCounties: { code: string; name: string }[] = [];
  dropdownSettings: IDropdownSettings = {};
  countyDropdownSettings: IDropdownSettings = {};
  itemsShowLimit = 10;
  filteredObservers: Observer[] = [];

  constructor(
    private notificationsService: NotificationsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.notificationsService
      .getCounties()
      .subscribe((res) => (this.counties = res));

    this.countyDropdownSettings = {
      singleSelection: true,
      idField: 'code',
      textField: 'name',
      itemsShowLimit: this.itemsShowLimit,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
    this.dropdownSettings = {
      singleSelection: true,
      itemsShowLimit: this.itemsShowLimit,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
  }

  onCountySelect(item: any) {
    this.resetSelections();
    this.fillPollingStations();
  }

  submitNotification() {
    // TODO: change channel and from
    const notification: NotificationModel = this.createNotification();

    if (this.isValid(notification)) {
      const message = this.translate.instant('NOTIFICATION_SEND_CONFIRMATION');
      if (!confirm(message.replace('%d', this.selectedObserversIds.length))) {
        return;
      }
      this.notificationsService
        .pushNotification(notification)
        .subscribe((x) => console.log(x));
    } else {
      alert('Not all fields have been completed');
    }
  }

  submitNotificationGlobally() {
    const notification: GlobalNotificationModel = this.createGlobalNotification();

    if (this.isValidGlobally(notification)) {
      this.notificationsService
        .pushNotificationGlobally(notification)
        .subscribe((x) => console.log(x));
    } else {
      alert('Not all fields have been completed');
    }
  }

  isValidNoArg(): boolean {
    return this.isValid(this.createNotification());
  }

  isValid(notification: NotificationModel): boolean {
    if (!this.isValidGlobally(notification)) {
      return false;
    }

    return !(!notification.recipients || !(notification.recipients.length > 0));


  }

  isValidGloballyNoArg(): boolean {
    return this.isValidGlobally(this.createGlobalNotification());
  }

  isValidGlobally(notification: GlobalNotificationModel): boolean {
    if (!notification.message || notification.message === '') {
      return false;
    }
    if (!notification.title || notification.title === '') {
      return false;
    }
    if (!notification.channel || notification.channel === '') {
      return false;
    }
    return !(!notification.from || notification.from === '');

  }

  private createNotification(): NotificationModel {
    return {
      channel: 'Firebase',
      from: 'Monitorizare Vot',
      message: this.message,
      title: this.notificationTitle,
      recipients: this.selectedObserversIds,
    };
  }

  private createGlobalNotification(): GlobalNotificationModel {
    return {
      channel: 'Firebase',
      from: 'Monitorizare Vot',
      message: this.message,
      title: this.notificationTitle,
    };
  }

  private fillPollingStations(): void {
    this.pollingStations = [];
    if (this.selectedCounties && this.selectedCounties.length > 0) {
      const selectedCounty: any = this.selectedCounties[0];
      const countyDetails: CountyPollingStationInfo = this.counties.find(
        (x) => x.code === selectedCounty.code
      );
      if (countyDetails) {
        for (let i = 1; i <= countyDetails.limit; i++) {
          this.pollingStations.push(i);
        }
      }
    }
  }

  resetSelections() {
    this.pollingStationTo = [];
    this.pollingStationFrom = [];
  }

  searchForObservers() {
    const to = this.pollingStationTo[0];
    const from = this.pollingStationFrom[0];

    this.notificationsService
      .getActiveObserversInCounties(
        this.selectedCounties.map((x) => x.code),
        from,
        to
      )
      .subscribe((res) => {
        this.filteredObservers = res;
      });
  }

  selectedObserversIds: string[] = [];

  onObserverSelect(selectedObserver: Partial<Observer>) {
    if (selectedObserver.isSelected) {
      this.selectedObserversIds.push(selectedObserver.id);
    } else {
      const index = this.selectedObserversIds.findIndex(
        (observerId) => observerId === selectedObserver.id
      );
      this.selectedObserversIds.splice(index, 1);
    }
  }

  selectAll() {
    this.selectedObserversIds = [];
    this.filteredObservers.forEach((x) => {
      x.isSelected = true;
      this.selectedObserversIds.push(x.id);
    });
  }

  deselectAll() {
    this.selectedObserversIds = [];
    this.filteredObservers.forEach((x) => {
      x.isSelected = false;
    });
  }
  resetFilter() {
    this.pollingStationFrom = [];
    this.pollingStationTo = [];
    this.selectedCounties = [];
  }
}
