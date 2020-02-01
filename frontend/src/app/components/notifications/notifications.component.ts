import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NotificationsService, CountyPollingStationInfo } from '../../services/notifications.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {GlobalNotificationModel, NotificationModel} from '../../models/notification.model';
import { Observer } from 'app/models/observer.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notificationTitle: string;
  message: string;
  counties: CountyPollingStationInfo[] = [];
  pollingStations = [];
  pollingStationFrom = [];
  pollingStationTo = [];
  selectedCounties: { code: string, name: string }[] = [];
  dropdownSettings: IDropdownSettings = {};
  countyDropdownSettings: IDropdownSettings = {};
  itemsShowLimit = 10;
  filteredObservers: Observer[] = [];

  constructor(private notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.notificationsService.getCounties().subscribe(res => this.counties = res);

    this.countyDropdownSettings = {
      singleSelection: true,
      idField: 'code',
      textField: 'name',
      itemsShowLimit: this.itemsShowLimit,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.dropdownSettings = {
      singleSelection: true,
      itemsShowLimit: this.itemsShowLimit,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }

  onCountySelect(item: any) {
    this.resetSelections();
    this.fillPollingStations();
  }

  submitNotification() {
    // TODO: change channel and from
    const notification: NotificationModel = {
      channel: 'Firebase',
      from: 'Monitorizare Vot',
      message: this.message,
      title: this.notificationTitle,
      recipients: this.selectedObserversIds
    };

    if (this.isValid(notification)) {
      this.notificationsService.pushNotification(notification).subscribe(x => console.log(x));
    } else {
      alert('Not all fields have been completed');
    }
  }

  submitNotificationGlobally() {
    const notification: GlobalNotificationModel = {
      channel: 'Firebase',
      from: 'Monitorizare Vot',
      message: this.message,
      title: this.notificationTitle
    };

    if (this.isValidGlobally(notification)) {
      this.notificationsService.pushNotificationGlobally(notification).subscribe(x => console.log(x));
    } else {
      alert('Not all fields have been completed');
    }
  }

  private isValid(notification: NotificationModel): boolean {
    if (!this.isValidGlobally(notification)) {
      return false;
    }

    if (!notification.recipients || !(notification.recipients.length > 0)) {
      return false;
    }

    return true;
  }

  private isValidGlobally(notification: GlobalNotificationModel): boolean {
    if (!notification.message || notification.message === '') {
      return false;
    }
    if (!notification.title || notification.title === '') {
      return false;
    }
    if (!notification.channel || notification.channel === '') {
      return false;
    }
    if (!notification.from || notification.from === '') {
      return false;
    }
    return true;
  }

  private fillPollingStations(): void {
    this.pollingStations = [];
    if (this.selectedCounties && this.selectedCounties.length > 0) {
      const selectedCounty: any = this.selectedCounties[0];
      const countyDetails: CountyPollingStationInfo = this.counties.find(x => x.code === selectedCounty.code);
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
    const to = this.pollingStationTo[0].id;
    const from = this.pollingStationFrom[0].id;

    this.notificationsService.getActiveObserversInCounties(this.selectedCounties.map(x => x.code), from, to).subscribe(res => {
      this.filteredObservers = res;
    });
  }

  selectedObserversIds: string[] = [];

  onObserverSelect(selectedObserver: Partial<Observer>) {
    if (selectedObserver.isSelected) {
      this.selectedObserversIds.push(selectedObserver.id);
    }
    else {
      const index = this.selectedObserversIds.findIndex((observerId) => observerId === selectedObserver.id);
      this.selectedObserversIds.splice(index, 1);
    }
  }

  selectAll() {
    this.selectedObserversIds = [];
    this.filteredObservers.forEach(x => {
      x.isSelected = true;
      this.selectedObserversIds.push(x.id);
    });
  }

  deselectAll() {
    this.selectedObserversIds = [];
    this.filteredObservers.forEach(x => {
      x.isSelected = false;
    });

  }
  resetFilter(){
    this.pollingStationFrom = [];
    this.pollingStationTo = [];
    this.selectedCounties = [];
  }
}

