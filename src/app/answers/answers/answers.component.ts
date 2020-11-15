
import { map, take, distinctUntilChanged } from 'rxjs/operators';
import { LoadAnswerDetailsAction, LoadAnswerPreviewAction } from '../../store/answer/answer.actions';
import { AnswerState } from '../../store/answer/answer.reducer';
import { FormState } from '../../store/form/form.reducer';
import { AppState } from '../../store/store.module';
import { AnswersService, AnswersPackFilter } from '../../services/answers.service';
import { Component, HostBinding, Inject, InjectionToken, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import { TranslateService } from '@ngx-translate/core';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';
import { SortedColumnEvent, TableColumn, TableColumnTranslated } from 'src/app/table/table-container/table-container.component';

// TODO: add translations
const TABLE_COLUMNS = new InjectionToken('TABLE_COLUMNS', {
  providedIn: 'root',
  factory: () => {
    const columns: TableColumn[] = [
      { name: 'ANSWERS_POLLING_STATION', propertyName: 'pollingStationName', },
      { name: 'ANSWERS_NAME', propertyName: 'observerName', },
      { name: 'ANSWERS_PHONE', propertyName: 'observerPhoneNumber', }, // FIXME: 
      { name: 'ANSWERS_DATE_AND_TIME', propertyName: 'lastSeen', canBeSorted: true },
      { name: 'ANSWERS_LOCATION_TYPE', propertyName: 'not-specified', }, // FIXME: 
    ];

    return columns;
  },
});


@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  formState: Observable<FormState>;
  tableColumns: TableColumnTranslated[] = [];

  countyCode: string;
  pollingStationNumber: string;
  observerPhone: number;
  isUrgent: boolean;
  fromTime: string;
  toTime: string;
  isLoading: boolean;

  answerState: Observable<AnswerState> = this.store.pipe(select(state => state.answer));
  answers$: Observable<AnswerState['threads']> = this.answerState.pipe(map(s => s.threads));

  constructor(
    private store: Store<AppState>,
    private answersService: AnswersService,
    private translate: TranslateService,
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants,
    @Inject(TABLE_COLUMNS) rawTableColumns: TableColumn[],
  ) {
    this.translateColumnNames(rawTableColumns);
  }

  ngOnInit() {
    this.formState = this.store.pipe(select(state => state.form));

    this.answerState.subscribe(value => {
      this.isUrgent = value.urgent || false;
      this.countyCode = value.answerFilters.county;
      this.pollingStationNumber = value.answerFilters.pollingStationNumber;
      this.observerPhone = value.answerFilters.observerPhone;
    });
  }

  requestFilteredData() {
    this.store.dispatch(new LoadAnswerPreviewAction(this.isUrgent, 1, 5, true, {
      observerPhone: this.observerPhone,
      pollingStationNumber: this.pollingStationNumber,
      county: this.countyCode
    }));

  }

  redoAnswerListAction() {
    // take the current state of the answerState, and do a reloaded
    this.store.pipe(select(state => state.answer), take(1),
      map(s => new LoadAnswerPreviewAction(s.urgent, s.page, s.pageSize, true, s.answerFilters)),
      map(a => this.store.dispatch(a))).subscribe();
  }

  redoAnswerDetailsAction() {
    // take the current state of the answerState, and do a reloaded
    this.store.pipe(select(state => state.answer), take(1),
      map(s => new LoadAnswerDetailsAction(s.observerId, s.sectionId)),
      map(a => this.store.dispatch(a)))
      .subscribe();
  }

  onPageChanged(event) {
    this.store.pipe(select(s => s.answer),
      map(s => new LoadAnswerPreviewAction(s.urgent, event.page, event.pageSize, false, s.answerFilters)),
      map(a => {
        this.store.dispatch(a);
      }),
      take(1),
    )
      .subscribe();
  }

  resetFilters(): void {
    this.countyCode = null;
    this.pollingStationNumber = null;
    this.observerPhone = null;
    this.fromTime = null;
    this.toTime = null;
  }

  onSortedColumnClicked({ col, sortDirection }: SortedColumnEvent) {
    console.log(col, sortDirection);

    // TODO: call proper API
  }

  private isValidValue(value) {
    return value !== null && value !== '';
  }

  downloadAnswers() {
    if (!confirm(this.translate.instant('ANSWERS_DOWNLOAD_CONFIRMATION'))) {
      return;
    }

    const filter: AnswersPackFilter = {};
    if (this.isValidValue(this.countyCode)) {
      filter.county = this.countyCode;
    }

    if (this.isValidValue(this.pollingStationNumber)) {
      filter.pollingStationNumber = this.pollingStationNumber as any;
    }

    if (this.isValidValue(this.observerPhone)) {
      filter.phoneObserver = this.observerPhone;
    }

    if (this.isValidValue(this.fromTime)) {
      filter.from = this.fromTime;
    }

    if (this.isValidValue(this.toTime)) {
      filter.to = this.toTime;
    }

    this.isLoading = true;
    return this.answersService.downloadAnswers(filter).subscribe(res => {
      this.isLoading = false;
      FileSaver.saveAs(res, 'answsers.xlsx');
    }, error => {
      this.isLoading = false;
    });
  }

  private translateColumnNames(rawTableColumns: TableColumn[]) {
    this.tableColumns = rawTableColumns.map(
      ({ name, ...rest }) => ({ ...rest, name: this.translate.get(name) })
    );
  }
}
