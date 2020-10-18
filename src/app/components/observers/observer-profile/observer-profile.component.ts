import { Component, Inject, OnInit } from '@angular/core';
import { ObserverProfileForm } from './observer-profile.form';
import { ObserversService } from '../../../services/observers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageState } from '../../../models/page-state.model';
import { Observer } from '../../../models/observer.model';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiListResponse } from '../../../models/api-list-response.model';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';

@Component({
  selector: 'app-observer-profile',
  templateUrl: './observer-profile.component.html',
  styleUrls: ['./observer-profile.component.scss'],
})
export class ObserverProfileComponent implements OnInit {
  error: string;
  fileData: File;

  observerProfileForm: FormGroup;
  observerProfileUploadForm: FormGroup;
  observer: Observer;
  pageState: PageState;

  constructor(
    private observerService: ObserversService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants
  ) {
    this.observerProfileForm = this.fb.group({
      firstName: '',
      lastName: '',
      phoneNumber: ['', Validators.required],
    })

    // this.observerProfileUploadForm = this.fb.group({
    //   csv: null,
    //   ongId: new FormControl('', Validators.required),
    // });
  }

  ngOnInit() {
    this.initRouteListener();
  }

  saveObserver() {
    if (this.pageState === PageState.NEW) {
      this.addNewObserver();
    } else {
      this.saveChanges();
    }
  }

  deleteObserver() {
    if (confirm('Are you sure you want to remove this observer?')) {
      this.observerService
        .deleteObserver(this.observer.id)
        .subscribe((data) => {
          this.toastr.warning('Success', 'Observer has been removed');
          this.router.navigateByUrl('/observatori');
        });
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.observerProfileUploadForm.get('csv').setValue(file);
    }
  }

  onSubmit() {
    console.warn("[submit] TO BE IMPLEMEMTED", this.observerProfileForm.value)
    // this.saveChanges();

    return;
    const formData = new FormData();
    formData.append('file', this.observerProfileUploadForm.get('csv').value);
    formData.append('ongId', this.observerProfileUploadForm.get('ongId').value);

    this.observerService.uploadCsv(formData).subscribe(
      (res) => {
        this.toastr.success(
          `${res} observers have been added successfully`,
          'Success'
        );
      },
      (err) => {
        this.toastr.error('Encountered error while uploading csv', 'Error');
      }
    );
  }

  private initRouteListener() {
    this.route.params.subscribe((params) => {
      this.pageState = params['state'];
      this.handleFormState();
      this.addControlBasedOnState();
      this.getObserver(params);
    });
  }

  private saveChanges() {
    this.observerService
      .saveChanges(this.observerProfileForm.value, this.observer)
      .subscribe((data) => {
        this.toastr.success('Success', 'Changes have been saved');
      });
  }

  private addNewObserver() {
    const observerToAdd: Observer = new Observer({});
    observerToAdd.phone = this.observerProfileForm.value.phone;
    observerToAdd.pin = this.observerProfileForm.value.password;
    observerToAdd.name = this.observerProfileForm.value.name;
    // observerToAdd.sendSMS = this.observerProfileForm.value.sendSMS;

    this.observerService.addNewObserver(observerToAdd).subscribe((value) => {
      this.toastr.success('Success', 'Observer has been added');
      this.router.navigateByUrl('/observatori');
    });
  }

  private handleFormState() {
    if (this.pageState === PageState.VIEW) {
      this.observerProfileForm.disable();
    } else {
      this.observerProfileForm.enable();
    }
  }

  private getObserver(params) {
    if (this.pageState !== PageState.NEW) {
      this.observerService
        .getObserver(params['id'])
        .subscribe((observers: ApiListResponse<Observer>) => {
          if (observers) {
            this.observer = observers.data[0];
            this.observerProfileForm.patchValue(this.observer);
          }
        });
    }
  }

  private addControlBasedOnState () {
    if (this.pageState !== PageState.EDIT) {
      return;
    }

    this.observerProfileForm.addControl('password', this.fb.control(''))
  }
}
