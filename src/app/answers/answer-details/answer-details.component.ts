import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { asyncScheduler, concat, EMPTY, Observable, of, Subject, combineLatest, merge } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, distinctUntilKeyChanged, endWith, filter, ignoreElements, map, mapTo, scan, share, shareReplay, skip, startWith, subscribeOn, switchMap, take, takeWhile, tap, withLatestFrom } from 'rxjs/operators';
import { AnswerExtra } from 'src/app/models/answer.extra.model';
import { AnswerThread } from 'src/app/models/answer.thread.model';
import { FormDetails } from 'src/app/models/form.info.model';
import { Form } from 'src/app/models/form.model';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';
import { fetchAllFormTabs, FullyLoadFormAction } from 'src/app/store/form/form.actions';
import { AppState } from 'src/app/store/store.module';
import { DisplayedNote, SectionsState }  from '../answers.model';
import { getSelectedAnswersAsObject, getSelectedAnswersLoadingStatus, getSpecificThreadByObserver } from '../../store/answer/answer.selectors';
import { getFormItems, getFullyLoadedForms } from '../../store/form/form.selectors';

import { getNotes, getNotesAsObject, getNotesLoadingStatus, getNotesMergedWithQuestions } from '../../store/note/note.selectors';
import { Note } from 'src/app/models/note.model';
import { LoadNotesAction } from 'src/app/store/note/note.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


const notesTab = { id: -1, description: 'Notes' };

type Tab = Partial<FormDetails>

@Component({
  selector: 'answer-details',
  templateUrl: './answer-details.component.html',
  styleUrls: ['./answer-details.component.scss']
})
export class AnswerDetailsComponent implements OnInit {
  @ViewChild('modalTemplateRef') modalTemplateRef: TemplateRef<any>;

  formTabChanged = new Subject<{ id?: number }>();

  crtSelectedTabId = null;
  isNotesTabShown = false;
  scrolledQuestionId;
  crtClickedNote: { text: string; questionCode: string; attachmentsPaths: any[]; };

  statsLabels = [
    { name: this.translate.get('ANSWERS_STATION'), propertyName: 'pollingStationName', },
    { name: this.translate.get('ANSWERS_LOCATION'), propertyName: 'locationType', },
    { name: this.translate.get('ANSWERS_PHONE'), propertyName: 'observerPhoneNumber', },
    { name: this.translate.get('ANSWERS_DATE_AND_TIME'), propertyName: 'observerArrivalTime', },
  ];

  crtPollingStation$ = this.store.select(getSpecificThreadByObserver, +this.route.snapshot.params.idObserver)
  .pipe(
    tap(v => v === void 0 && this.router.navigate(['../../'], { relativeTo: this.route })),
    filter(Boolean),
    map<AnswerThread & AnswerExtra, any>(a => ({ ...a, locationType: a.urbanArea ? 'Urban' : 'Rural' })),
    shareReplay(1),
  );

  notes$: Observable<any> = this.store.select(getNotesMergedWithQuestions).pipe(shareReplay(1));

  formTabs$ = this.store.select(getFormItems).pipe(
    filter(tabs => !!tabs[0]),
    map(tabs => [...tabs, notesTab]),
    shareReplay(1),

    // This is needed in order to solve `ExpressionChangedAfterItHasBeenCheckedError`
    // when tabs are already in the store(e.g navigating to the details page for the second time)
    // might be because the second time, the tabs will be retrieved synchronously, so the check will yield
    // different values
    delay(0),
  );

  sections$ = combineLatest([
    concat(
      this.formTabs$.pipe(map(tabs => tabs[0]), take(1)),
      this.formTabChanged
    ).pipe(distinctUntilKeyChanged('id'), filter(tab => tab.id !== -1)),
    this.store.select(getFullyLoadedForms),
  ]).pipe(
    filter(([crtFormTab, _]) => !!crtFormTab),
    tap(
      ([crtFormTab, fullyLoadedForms]: [FormDetails, { [k: string]: Form }]) =>
        !fullyLoadedForms[crtFormTab.id] && this.store.dispatch(new FullyLoadFormAction(crtFormTab.id))
    ),
    map(([crtFormTab, fullyLoadedForms]: [FormDetails, { [k: string]: Form }]) => fullyLoadedForms[crtFormTab.id]),
    filter(Boolean),
    tap((loadedForm: Form) => this.crtSelectedTabId = this.crtSelectedTabId !== notesTab.id ? loadedForm.id : this.crtSelectedTabId),
    map((loadedForm: Form) => loadedForm?.formSections ?? []),

    debounceTime(0),
    distinctUntilChanged(),
    startWith([]),
    shareReplay(1),
  );

  sectionsState$ = combineLatest([
    this.sections$.pipe(filter((sections: any) => !!sections.length)),
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

  isSectionContentLoading$ = merge(
    this.sections$.pipe(debounceTime(100), map((s: any) => s.length === 0)),
    of(false)
  );

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private modalService: NgbModal,
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants
  ) { }

  ngOnInit(): void {
    const { idObserver, idPollingStation } = this.route.snapshot.params;

    this.store.dispatch(new LoadNotesAction(+idPollingStation, +idObserver));
  }

  onTabClicked (tab: Tab) {
    if (tab.description === 'Notes') {
      this.onNotesTabClicked(tab);

      return;
    }

    this.isNotesTabShown = false;
    this.crtSelectedTabId = null;
    this.formTabChanged.next(tab);
  }

  showModalWithNote (clickedNote) {
    this.crtClickedNote = clickedNote;

    this.modalService.open(this.modalTemplateRef, { centered: true, size: 'lg', });
  }

  private onNotesTabClicked (tab) {
    this.store.dispatch(fetchAllFormTabs());

    this.formTabChanged.next(notesTab);
    this.crtSelectedTabId = notesTab.id;
    this.isNotesTabShown = true;
  }
}
