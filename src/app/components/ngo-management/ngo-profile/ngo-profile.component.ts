import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
import { TranslateService } from '@ngx-translate/core';

const NOT_ONLY_SPACE_LINE = /^(\s*\S+\s*)+$/;

@Component({
  selector: 'app-ngo-profile',
  templateUrl: './ngo-profile.component.html',
  styleUrls: ['./ngo-profile.component.scss'],
})
export class NgoProfileComponent implements OnInit, OnDestroy {
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
    private translateService: TranslateService,
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
    if (confirm(this.translateService.instant('NGO_CONFIRM_DELETE'))) {
      this.ngosService
        .deleteNgo(this.ngo.id)
        .subscribe((data) => {
          this.toastr.warning('Success', this.translateService.instant('NGO_REMOVED_SUCCESS'));
          this.router.navigateByUrl('/observatori');
        });
    }
  }

  onSubmit() {
    if (this.pageState === PageState.EDIT) {
      this.saveChanges(this.ngoProfileForm.value);
    } else if (this.pageState === PageState.NEW) {
      this.addNewNgo(this.ngoProfileForm.value);
    }
  }

  private initRouteListener() {
    this.route.params.subscribe((params) => {
      this.pageState = params['state'];
      this.handleFormState();
      this.getObserver(params);
    });
  }

  private saveChanges(values: { [k: string]: any }) {
    this.ngosService
      .saveChanges(values, this.ngo)
      .subscribe((data) => {
        this.toastr.success('Success', 'Changes have been saved');
      });
  }

  private addNewNgo(values: { [k: string]: any }) {
    const ngoToAdd: NgoModel = new NgoModel({});
    ngoToAdd.isActive = (values.isActive as boolean);
    ngoToAdd.organizer = (values.organizer as boolean);
    ngoToAdd.shortName = (values.shortName as string);
    ngoToAdd.name = (values.name as string);

    this.ngosService.addNewNgo(ngoToAdd).subscribe((value) => {
      this.toastr.success('Success', this.translateService.instant('NGO_ADD_SUCCESS'));
      this.router.navigateByUrl('/ong');
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
}
