import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notificationForm: FormGroup;
  counties: FormArray;
   object:
    {
      "message": "string",
      "counties":[
        "GR",
        "IL"
        ],
      "observers":[
        "123",
        "124"
        ],
      "pollingStations":[
        "3456",
        "8966"
        ]
    }
  // constructor(private formBuilder: FormBuilder) { }
  constructor(private fb: FormBuilder, private formBuilder: FormBuilder) {
    this.form = this.fb.group({
      published: true,
      credentials: this.fb.array([]),
    });
  }
  ngOnInit() {
    this.notificationForm = this.formBuilder.group({
      message: '',
      counties: this.formBuilder.array([new FormControl('')]),
      observers: this.formBuilder.array([]),
      pollingStations: this.formBuilder.array([])
    });
  }

  addCounty(): void {
    const counties = this.notificationForm.controls.counties as FormArray;
    counties.push(new FormControl(''));
    console.log('dsadsa')
  }

  form: FormGroup;



  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.fb.group({
      username: '',
      password: '',
    }));
  }
}
