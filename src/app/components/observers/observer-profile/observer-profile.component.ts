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

const NOT_ONLY_SPACE_LINE = /^(\s*\S+\s*)+$/;

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
      name: ['', [Validators.required, Validators.pattern(NOT_ONLY_SPACE_LINE)]],
      phone: ['', [Validators.required, Validators.pattern(NOT_ONLY_SPACE_LINE)]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.initRouteListener();
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
    const sanitizedValues = this.trimFormValuesOutsideAndInside(this.observerProfileForm.value);
    
    if (this.pageState === PageState.EDIT) {
      this.saveChanges(sanitizedValues);
    } else if (this.pageState === PageState.NEW) {
      this.addNewObserver(sanitizedValues);
    }
  }

  private initRouteListener() {
    this.route.params.subscribe((params) => {
      this.pageState = params['state'];
      this.handleFormState();
      this.getObserver(params);
    });
  }

  private saveChanges(values: { [k: string]: string }) {
    this.observerService
      .saveChanges(values, this.observer)
      .subscribe((data) => {
        this.toastr.success('Success', 'Changes have been saved');
      });
  }

  private addNewObserver(values: { [k: string]: string }) {
    const observerToAdd: Observer = new Observer({});
    observerToAdd.phone = values.phone;
    observerToAdd.pin = values.password;
    observerToAdd.name = values.name;

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

  private trimFormValuesOutsideAndInside (values: { [k: string]: string }) {
    return Object.keys(values).reduce((acc, crtKey) => {
      const val = values[crtKey];
      const newVal = val.trim().split(' ').filter(Boolean).join(' ');

      return (acc[crtKey] = newVal, acc);
    }, {})
  }
}
