import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { concat, Observable, of, Subject, combineLatest, merge } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, distinctUntilKeyChanged, filter, map, scan, shareReplay, startWith, take, tap } from 'rxjs/operators';
import { FormDetails } from 'src/app/models/form.info.model';
import { Form } from 'src/app/models/form.model';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';
import { fetchAllFormTabs, FullyLoadFormAction } from 'src/app/store/form/form.actions';
import { AppState } from 'src/app/store/store.module';
import { SectionsState }  from '../answers.model';
import { getSelectedAnswersAsObject, getSpecificThreadByIds } from '../../store/answer/answer.selectors';
import { getFormItems, getFullyLoadedForms } from '../../store/form/form.selectors';

import { getNotesAsObject, getNotesMergedWithQuestions } from '../../store/note/note.selectors';
import {  NoteMap } from 'src/app/models/note.model';
import { LoadNotesAction } from 'src/app/store/note/note.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormSection} from '../../models/form.section.model';
import {CompletedQuestionMap} from '../../models/completed.question.model';


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
    { name: this.translate.get('ANSWERS_STATION'), propertyName: 'pollingStationName', type: 'STRING' },
    { name: this.translate.get('ANSWERS_PHONE'), propertyName: 'observerPhoneNumber', type: 'STRING'},
    { name: this.translate.get('ANSWERS_DATE_AND_TIME'), propertyName: 'lastModified', type: 'DATE'},
  ];

  crtPollingStation$ = this.store.select(getSpecificThreadByIds, {
    observerId: +this.route.snapshot.params.observerId,
    pollingStationId: +this.route.snapshot.params.pollingStationId,
  })
  .pipe(
    tap(v => v === void 0 && this.router.navigate(['../../'], { relativeTo: this.route })),
    filter(Boolean),
    shareReplay(1),
  );

  notes$: Observable<any> = this.store.select(getNotesMergedWithQuestions).pipe(shareReplay(1));

  formTabs$: Observable<Tab[]> = this.store.select(getFormItems).pipe(
    filter(tabs => !!tabs[0]),
    map(tabs => [...tabs, notesTab]),
    shareReplay(1),

    // This is needed in order to solve `ExpressionChangedAfterItHasBeenCheckedError`
    // when tabs are already in the store(e.g navigating to the details page for the second time)
    // might be because the second time, the tabs will be retrieved synchronously, so the check will yield
    // different values
    delay(0),
  );

  sections$: Observable<FormSection[]> = combineLatest([
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
    map<Form, FormSection[]>((loadedForm: Form) => loadedForm?.formSections ?? []),

    debounceTime(0),
    distinctUntilChanged(),
    startWith([]),
    shareReplay(1)
  ) as Observable<FormSection[]>;

  sectionsState$: Observable<SectionsState> = combineLatest([
    this.sections$.pipe(filter((sections) => !!sections.length)),
    this.store.select(getSelectedAnswersAsObject).pipe(filter<CompletedQuestionMap>(Boolean)),
    this.store.select(getNotesAsObject).pipe(filter<NoteMap>(Boolean))
  ]).pipe(
    scan(
      (acc: SectionsState, [crtSections, selectedAnswers, formNotes]) => {
        for (const section of crtSections) {
          for (const q of section.questions) {
            const isQuestionFlagged = q.optionsToQuestions.some(o => o.flagged && selectedAnswers[q.id]?.answers[o.optionId]);

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
    const { observerId, pollingStationId } = this.route.snapshot.params;

    this.store.dispatch(new LoadNotesAction(+pollingStationId, +observerId));
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
