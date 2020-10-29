import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { ApiListResponse } from '../../../models/api-list-response.model';
import { NgoModel } from '../../../models/ngo.model';
import { NgosService } from '../../../services/ngos.service';
import { PageState } from '../../../models/page-state.model';
import { BASE_BUTTON_VARIANTS, Variants } from '../../../shared/base-button/base-button.component';
import { getSelectedObserver } from '../../../store/observers/observers.state';

const NOT_ONLY_SPACE_LINE = /^(\s*\S+\s*)+$/;

@Component({
  selector: 'app-ngo-profile',
  templateUrl: './ngo-profile.component.html',
  styleUrls: ['./ngo-profile.component.scss'],
})
export class NgoProfileComponent implements OnInit {
  error: string;
  fileData: File;

  ngoProfileForm: FormGroup;
  ngo: NgoModel;
  pageState: PageState;

  private ngUnsubscribe = new Subject();

  constructor(
    private ngosService: NgosService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants
  ) {
    this.ngoProfileForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(NOT_ONLY_SPACE_LINE)]],
      shortName: ['', [Validators.required, Validators.pattern(NOT_ONLY_SPACE_LINE)]],
      isActive: [false, [Validators.required]],
      organizer: [false, [Validators.required]],
    });
  }

  ngOnInit() {
    this.initRouteListener();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  deleteNgo() {
    if (confirm('Are you sure you want to remove this ngo?')) {
      this.ngosService
        .deleteNgo(this.ngo.id)
        .subscribe((data) => {
          this.toastr.warning('Success', 'Observer has been removed');
          this.router.navigateByUrl('/observatori');
        });
    }
  }

  onSubmit() {
    const sanitizedValues = this.trimFormValuesOutsideAndInside(this.ngoProfileForm.value);

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
    this.ngosService
      .saveChanges(values, this.ngo)
      .subscribe((data) => {
        this.toastr.success('Success', 'Changes have been saved');
      });
  }

  private addNewObserver(values: { [k: string]: string | boolean }) {
    const ngoToAdd: NgoModel = new NgoModel({});
    ngoToAdd.isActive = (values.isActive as boolean);
    ngoToAdd.organizer = (values.organizer as boolean);
    ngoToAdd.shortName = (values.shortName as string);
    ngoToAdd.name = (values.name as string);

    this.ngosService.addNewNgo(ngoToAdd).subscribe((value) => {
      this.toastr.success('Success', 'Observer has been added');
      this.router.navigateByUrl('/observatori');
    });
  }

  private handleFormState() {
    if (this.pageState === PageState.VIEW) {
      this.ngoProfileForm.disable();
    } else {
      this.ngoProfileForm.enable();
    }
  }

  private getObserver(params) {
    if (this.pageState === PageState.NEW) {
      return;
    }

    this.store.select(getSelectedObserver, params['id'])
      .pipe(
        switchMap(
          obs => obs
            ? of(obs)
            : this.ngosService.getNgo(params['id'])
        ),
        takeUntil(this.ngUnsubscribe),
      ).subscribe((ngo: NgoModel) => {
        this.ngo = ngo;
        this.ngoProfileForm.patchValue(this.ngo);
      })
  }

  private trimFormValuesOutsideAndInside(values: { [k: string]: string }) {
    return Object.keys(values).reduce((acc, crtKey) => {
      const val = values[crtKey];
      const newVal = val.trim().split(' ').filter(Boolean).join(' ');

      return (acc[crtKey] = newVal, acc);
    }, {})
  }
}
