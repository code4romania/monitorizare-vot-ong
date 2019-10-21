import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NotificationsService} from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notificationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private notificationsService:NotificationsService) {
  }

  ngOnInit() {
    this.notificationForm = this.formBuilder.group({
      message: '',
      counties: this.formBuilder.array([new FormControl('')]),
      observers: this.formBuilder.array([new FormControl('')]),
      pollingStations: this.formBuilder.array([new FormControl('')])
    });
  }

  addCounty(): void {
    const counties = this.notificationForm.controls.counties as FormArray;
    counties.push(new FormControl(''));
  }

  addObserver(): void {
    const observers = this.notificationForm.controls.observers as FormArray;
    observers.push(new FormControl(''));
  }

  addPollingStation(): void {
    const pollingStations = this.notificationForm.controls.pollingStations as FormArray;
    pollingStations.push(new FormControl(''));
  }

  removeCounty(index: number): void {
    const counties = this.notificationForm.controls.counties as FormArray;
    counties.removeAt(index);
  }

  removeObserver(index: number): void {
    const observers = this.notificationForm.controls.observers as FormArray;
    observers.removeAt(index);
  }

  removePollingStation(index: number): void {
    const pollingStations = this.notificationForm.controls.observers as FormArray;
    pollingStations.removeAt(index);
  }

  submitNotification(){
    this.notificationsService.pushNotification(this.notificationForm.value);
  }
}
