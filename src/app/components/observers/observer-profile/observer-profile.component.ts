import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { ObserversService } from '../../../services/observers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageState } from '../../../models/page-state.model';
import { Observer } from '../../../models/observer.model';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiListResponse } from '../../../models/api-list-response.model';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';
import { Store } from '@ngrx/store';
import { getSelectedObserver } from 'src/app/store/observers/observers.state';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

const NOT_ONLY_SPACE_LINE = /^(\s*\S+\s*)+$/;

@Component({
  selector: 'app-observer-profile',
  templateUrl: './observer-profile.component.html',
  styleUrls: ['./observer-profile.component.scss'],
})
export class ObserverProfileComponent implements OnInit, OnDestroy {
  error: string;
  fileData: File;

  observerProfileForm: FormGroup;
  observerProfileUploadForm: FormGroup;
  observer: Observer;
  pageState: PageState;

  private ngUnsubscribe = new Subject();

  constructor(
    private observerService: ObserversService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private translateService: TranslateService,
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

  ngOnDestroy () {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  deleteObserver() {
    if (confirm(this.translateService.instant('OBSERVER_DELETE_CONFIRMATION'))) {
      this.observerService
        .deleteObserver(this.observer.id)
        .subscribe(() => {
          this.toastr.warning(this.translateService.instant('SUCCESS'), this.translateService.instant('OBSERVER_DELETE_SUCCESS'));
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
      this.pageState = params.state;
      this.handleFormState();
      this.getObserver(params);
    });
  }

  private saveChanges(values: { [k: string]: string }) {
    this.observerService
      .saveChanges(values, this.observer)
      .subscribe(() => {
        this.toastr.success('Success', 'Changes have been saved');
      });
  }

  private addNewObserver(values: { [k: string]: string }) {
    const observerToAdd: Observer = new Observer({});
    observerToAdd.phone = values.phone;
    observerToAdd.pin = values.password;
    observerToAdd.name = values.name;

    this.observerService.addNewObserver(observerToAdd).subscribe(() => {
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
    if (this.pageState === PageState.NEW) {
      return;
    }

    this.store.select(getSelectedObserver, params.id)
      .pipe(
        switchMap(
          obs => obs
            ? of(obs)
            : this.observerService.getObserver(params.id).pipe(
              map((o: ApiListResponse<Observer>) => o ? o.data[0] : {})
            )
        ),
        takeUntil(this.ngUnsubscribe),
      ).subscribe((observer: Observer) => {
        this.observer = observer;
        this.observerProfileForm.patchValue(this.observer);
      })
  }

  private trimFormValuesOutsideAndInside (values: { [k: string]: string }) {
    return Object.keys(values).reduce((acc, crtKey) => {
      const val = values[crtKey];
      const newVal = val.trim().split(' ').filter(Boolean).join(' ');

      return (acc[crtKey] = newVal, acc);
    }, {})
  }
}
