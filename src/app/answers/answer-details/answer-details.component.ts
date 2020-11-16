import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { asyncScheduler, concat, EMPTY, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, share, shareReplay, skip, subscribeOn, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { AnswerThread } from 'src/app/models/answer.thread.model';
import { FormDetails } from 'src/app/models/form.info.model';
import { Form } from 'src/app/models/form.model';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';
import { FullyLoadFormAction } from 'src/app/store/form/form.actions';
import { AppState } from 'src/app/store/store.module';

import { getSpecificThreadByObserver } from '../../store/answer/answer.selectors';
import { form, getFormItems, getFullyLoadedForms } from '../../store/form/form.selectors';

@Component({
  selector: 'answer-details',
  templateUrl: './answer-details.component.html',
  styleUrls: ['./answer-details.component.scss']
})
export class AnswerDetailsComponent implements OnInit {
  crtPollingStation$: Observable<AnswerThread>;
  formTabs$: Observable<FormDetails[]>;
  sections$: Observable<any>;

  formTabChanged = new Subject();

  crtSelectedTabId: number = null;

  statsLabels = [
    { name: 'Station', propertyName: 'pollingStationName', },
    { name: 'Location', propertyName: 'not-specified', },
    { name: 'Phone', propertyName: 'observerPhoneNumber', },
    { name: 'Date&Time', propertyName: 'not-specified', },
  ];

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants
  ) { }
  
  ngOnInit(): void {
    const { idObserver, idPollingStation } = this.route.snapshot.params;

    this.crtPollingStation$ = this.store.select(getSpecificThreadByObserver, +idObserver)
      .pipe(
        tap(v => v === void 0 && this.router.navigate(['../../'], { relativeTo: this.route })),
        
        // data retrieval from the store is done synchronously
        // so we want to subscribe to the store after the template's subscriptions
        // are created
        subscribeOn(asyncScheduler),
        share(),
      );

    this.formTabs$ = this.store.select(getFormItems).pipe(shareReplay(1));

    this.sections$ = concat(
      this.formTabs$.pipe(map(tabs => tabs[0]), take(1)),
      this.formTabChanged
    ).pipe(
      distinctUntilChanged(),
      withLatestFrom(this.store.select(getFullyLoadedForms)),
      switchMap(([formTab, fullyLoadedForms]: [FormDetails, { [k: string]: any }]) => {
        if (!formTab) { 
          return EMPTY; 
        }
        
        // there might be the case when `form.items` is not an empty array,
        // but the `form.fullyLoaded[formTab.id]` is not populated yet
        if (!fullyLoadedForms[formTab.id]) {
          this.store.dispatch(new FullyLoadFormAction(formTab.id));

          return this.store.select(getFullyLoadedForms).pipe(
            skip(1),
            map(fullyLoadedForms => fullyLoadedForms[formTab.id])
          )
        }

        return of(fullyLoadedForms[formTab.id]);        
      }),
      tap(loadedForm => this.crtSelectedTabId = loadedForm.id),
      map((loadedForm: Form) => loadedForm?.formSections ?? [])
    );
  }
}
