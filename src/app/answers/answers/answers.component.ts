
import { map, take, shareReplay } from 'rxjs/operators';
import { LoadAnswerDetailsAction, LoadAnswerPreviewAction, updateFilters, updatePageInfo } from '../../store/answer/answer.actions';
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
import { TableColumn, TableColumnTranslated, SortedColumnEvent } from 'src/app/table/table.model';
import { AnswerThread } from 'src/app/models/answer.thread.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerFilters } from 'src/app/models/answer.filters.model';
import { getFilters } from 'src/app/store/answer/answer.selectors';

const TABLE_COLUMNS = new InjectionToken('TABLE_COLUMNS', {
  providedIn: 'root',
  factory: () => {
    const columns: TableColumn[] = [
      { name: 'ANSWERS_POLLING_STATION', propertyName: 'pollingStationName', },
      { name: 'ANSWERS_NAME', propertyName: 'observerName', },
      { name: 'ANSWERS_PHONE', propertyName: 'observerPhoneNumber', }, // FIXME: 
      { name: 'ANSWERS_DATE_AND_TIME', propertyName: 'not-specified', canBeSorted: true },
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

  isLoading: boolean;
  previousUsedFilters = null;

  answerState$: Observable<AnswerState> = this.store.pipe(select(state => state.answer), shareReplay(1));
  answers$: Observable<AnswerState['threads']> = this.answerState$.pipe(map(s => s.threads));
  filters$: Observable<AnswerFilters> = this.store.select(getFilters);

  constructor(
    private store: Store<AppState>,
    private answersService: AnswersService,
    private translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants,
    @Inject(TABLE_COLUMNS) rawTableColumns: TableColumn[],
  ) {
    this.translateColumnNames(rawTableColumns);
    this.store.dispatch(new LoadAnswerPreviewAction());
  }

  ngOnInit() {
    this.formState = this.store.pipe(select(state => state.form));
  }

  requestFilteredData (filters) {
    this.store.dispatch(updateFilters(filters));
    this.store.dispatch(new LoadAnswerPreviewAction(1));
  }

  onPageChanged(event) {
    this.store.dispatch(new LoadAnswerPreviewAction(event.page, event.pageSize));
  }

  onSortedColumnClicked({ col, sortDirection }: SortedColumnEvent) {
    console.log(col, sortDirection);

    // TODO: call proper API
  }

  onResetFilters () {
    this.store.dispatch(updateFilters({}));
    this.store.dispatch(new LoadAnswerPreviewAction(1));
  }

  onRowClicked({ idObserver, idPollingStation }: AnswerThread) {
    this.router.navigate([idObserver, idPollingStation], { relativeTo: this.activatedRoute });
    this.store.dispatch(new LoadAnswerDetailsAction(idObserver, idPollingStation));
  }

  private isValidValue(value) {
    return value !== null && value !== '';
  }

  downloadAnswers (rawFilters) {
    if (!confirm(this.translate.instant('ANSWERS_DOWNLOAD_CONFIRMATION'))) {
      return;
    }

    const filterWordsDict = {
      countyCode: 'county',
      pollingStationNumber: 'pollingStationNumber',
      observerPhone: 'phoneObserver',
      fromTime: 'from',
      toTime: 'to',
    };

    const filter: AnswersPackFilter = {};

    for (const rawKey in rawFilters) {
      const rawValue = rawFilters[rawKey];
      const key = filterWordsDict[rawKey];

      if (this.isValidValue(rawValue)) {
        filter[key] = rawValue;
      }
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
