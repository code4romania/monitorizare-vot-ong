import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {NotificationsService} from '../../services/notifications.service';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {NotificationModel} from '../../models/notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  message: string;
  dropdownCouties = [];
  dropdownObservers = [];
  dropdownPollingStations = [];
  selectedCounties = [];
  selectedObservers = [];
  selectedPollingStations = [];
  dropdownSettings: IDropdownSettings = {};
  itemsShowLimit = 10;

  constructor(private formBuilder: FormBuilder, private notificationsService: NotificationsService) {
  }

  ngOnInit() {

    // TODO: make a request for counties
    // this.notificationsService.getCounties().subscribe( res => this.dropdownCouties = res);
    this.dropdownCouties = ['Bv', 'Is', 'Cj', 'Sb', 'Tm'];

    this.dropdownSettings = {
      singleSelection: false,
      // idField: 'item_text',
      // textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: this.itemsShowLimit,
      allowSearchFilter: true
    };
  }

  onCountySelect(item: any) {
    // TODO: make a request depends on the observers
    console.log(item);
    this.getObserversAndPollingStations();

    this.dropdownObservers = ['1', '2', '3', '4', '5'];

    this.dropdownPollingStations = ['1', '2', '3', '4', '5'];
  }

  onSelectAllCounties(items: any) {
    // TODO: request observers and polling stations depends on all counties
    // this.getObserversAndPollingStations();
  }

  onObserverSelect(item: any) {
    console.log(item);
  }

  onSelectAllObservers(items: any) {
    console.log(items);
  }

  onPollingStationSelect(item: any) {
    console.log(item);
  }

  onSelectAllPollingStations(items: any) {
    console.log(items);
  }

  submitNotification() {
    const notification: NotificationModel = new NotificationModel(this.message, this.selectedCounties,
      this.selectedObservers, this.selectedPollingStations);

    if(this.isValid(notification)){
      this.notificationsService.pushNotification(notification);
    } else {
      alert('Not all fields have been completed');
    }
  }

  private getObserversAndPollingStations():void {
    this.notificationsService.getObserversCountiesObservers(this.selectedCounties).subscribe(res => this.dropdownObservers = res);
    this.notificationsService.getObserversCountiesPollingStations(this.selectedCounties).subscribe(res => this.dropdownPollingStations = res);
  }

  private isValid(notification: NotificationModel): boolean{
    if(!notification.message || notification.message === ''){
      return false;
    }
    if(!notification.counties || !(notification.counties.length > 0)){
      return false;
    }
    if(!notification.observers || !(notification.observers.length > 0)){
      return false;
    }
    if(!notification.pollingStations || !(notification.pollingStations.length >0)){
      return false;
    }
    return true;
  }
}
