import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { asyncScheduler, concat, EMPTY, Observable, of, Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, filter, map, scan, share, shareReplay, skip, startWith, subscribeOn, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { AnswerExtra } from 'src/app/models/answer.extra.model';
import { AnswerThread } from 'src/app/models/answer.thread.model';
import { FormDetails } from 'src/app/models/form.info.model';
import { Form } from 'src/app/models/form.model';
import { FormQuestion } from 'src/app/models/form.question.model';
import { Note } from 'src/app/models/note.model';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';
import { FullyLoadFormAction } from 'src/app/store/form/form.actions';
import { AppState } from 'src/app/store/store.module';

import { getSelectedAnswersAsObject, getSpecificThreadByObserver } from '../../store/answer/answer.selectors';
import { getFormItems, getFullyLoadedForms } from '../../store/form/form.selectors';

import { getNotesAsObject } from '../../store/note/note.selectors';

@Component({
  selector: 'answer-details',
  templateUrl: './answer-details.component.html',
  styleUrls: ['./answer-details.component.scss']
})
export class AnswerDetailsComponent implements OnInit {
  crtPollingStation$: Observable<AnswerThread & { locationType: string }>;
  formTabs$: Observable<FormDetails[]>;
  sections$: Observable<any>;
  sectionsState$: Observable<
    { 
      flaggedQuestions: { [k: string]: FormQuestion }, 
      selectedAnswers: { [k: string]: any },
      formNotes: { [k: string]: Note },
    }
  >;

  formTabChanged = new Subject();

  shownNotes: { [k: string]: boolean } = {};
  crtSelectedTabId = null;

  statsLabels = [
    { name: this.translate.get('ANSWERS_STATION'), propertyName: 'pollingStationName', },
    { name: this.translate.get('ANSWERS_LOCATION'), propertyName: 'locationType', },
    { name: this.translate.get('ANSWERS_PHONE'), propertyName: 'observerPhoneNumber', },
    { name: this.translate.get('ANSWERS_DATE_AND_TIME'), propertyName: 'observerArrivalTime', },
  ];

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants
  ) { }
  
  ngOnInit(): void {
    const { idObserver, idPollingStation } = this.route.snapshot.params;

    this.crtPollingStation$ = this.store.select(getSpecificThreadByObserver, +idObserver)
      .pipe(
        tap(v => v === void 0 && this.router.navigate(['../../'], { relativeTo: this.route })),
        filter(Boolean),
        map<AnswerThread & AnswerExtra, any>(a => ({ ...a, locationType: a.urbanArea ? 'Urban' : 'Rural' })),
        
        // data retrieval from the store is done synchronously
        // so we want to subscribe to the store after the template's subscriptions
        // are created
        subscribeOn(asyncScheduler),
        share(),
      );

    this.formTabs$ = this.store.select(getFormItems).pipe(shareReplay(1));

    this.sections$ = combineLatest([
      concat(
        this.formTabs$.pipe(map(tabs => tabs[0]), filter(Boolean), take(1)),
        this.formTabChanged
      ).pipe(distinctUntilChanged()),
      this.store.select(getFullyLoadedForms),
    ]).pipe(
      filter(([crtFormTab, _]) => !!crtFormTab),
      tap(
        ([crtFormTab, fullyLoadedForms]: [FormDetails, { [k: string]: Form }]) => 
          !fullyLoadedForms[crtFormTab.id] && this.store.dispatch(new FullyLoadFormAction(crtFormTab.id))
      ),
      map(([crtFormTab, fullyLoadedForms]: [FormDetails, { [k: string]: Form }]) => fullyLoadedForms[crtFormTab.id]),
      filter(Boolean),
      tap((loadedForm: Form) => this.crtSelectedTabId = loadedForm.id),
      map((loadedForm: Form) => loadedForm?.formSections ?? []),

      startWith([]),
      shareReplay(1),
    );

    this.sectionsState$ = combineLatest([
      this.sections$.pipe(filter(sections => !!sections.length)),
      this.store.select(getSelectedAnswersAsObject).pipe(filter(Boolean)),
      this.store.select(getNotesAsObject).pipe(filter(Boolean))
    ]).pipe(
      scan(
        (acc, [crtSections, selectedAnswers, formNotes]) => {
          for (const section of crtSections) {
            for (const q of section.questions) {
              const isQuestionFlagged = q.optionsToQuestions.some(o => o.flagged && selectedAnswers[q.id]?.answers[o.id]);

              if (isQuestionFlagged) {
                acc.flaggedQuestions[q.id] = true;
              }
            }
          }

          return {
            ...acc,
            selectedAnswers,
            formNotes,
          };
        },
        { flaggedQuestions: {}, selectedAnswers: {}, formNotes: {} }
      ),
    );
  }
}
