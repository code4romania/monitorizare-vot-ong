
import { map, shareReplay, finalize, take, filter } from 'rxjs/operators';
import { LoadAnswerDetailsAction, LoadAnswerPreviewAction, updateFilters, updatePageInfo } from '../../store/answer/answer.actions';
import { AnswerState } from '../../store/answer/answer.reducer';
import { FormState } from '../../store/form/form.reducer';
import { AppState } from '../../store/store.module';
import { AnswersService, AnswersPackFilter } from '../../services/answers.service';
import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import { TranslateService } from '@ngx-translate/core';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';
import { TableColumn, TableColumnTranslated, SortedColumnEvent } from 'src/app/table/table.model';
import { AnswerThread } from 'src/app/models/answer.thread.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerFilters } from 'src/app/models/answer.filters.model';
import { getAnswerThreads, getFilters } from 'src/app/store/answer/answer.selectors';
import { CountyAnswersFetchAction } from 'src/app/store/county/county.actions';
import { County } from 'src/app/store/county/county.state';
import { AnswerExtra } from 'src/app/models/answer.extra.model';
import { FormLoadAction } from 'src/app/store/form/form.actions';
import { FormBuilder } from '@angular/forms';

const TABLE_COLUMNS = new InjectionToken('TABLE_COLUMNS', {
  providedIn: 'root',
  factory: () => {
    const columns: TableColumn[] = [
      { name: 'ANSWERS_POLLING_STATION', propertyName: 'pollingStationName', },
      { name: 'ANSWERS_NAME', propertyName: 'observerName', },
      { name: 'ANSWERS_PHONE', propertyName: 'observerPhoneNumber', },
      { name: 'ANSWERS_DATE_AND_TIME', propertyName: 'lastModified', canBeSorted: true, dataType: 'DATE' },
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

  filtersForm = this.fb.group({
    county: '',
    pollingStationNumber: '',
    observerPhoneNumber: '',
    urgent: '',
  });

  isLoading: boolean;
  previousUsedFilters = null;

  answerState$: Observable<AnswerState> = this.store.pipe(select(state => state.answer), shareReplay(1));
  answers$: Observable<(AnswerThread | AnswerExtra)[]> = this.store.select(getAnswerThreads);
  filters$: Observable<AnswerFilters> = this.store.select(getFilters);

  public counties$ = this.store.select(state => state.county).pipe(
    map(countyList => countyList?.counties),
    filter(counties => !!counties),
    map((counties: County[]) => [{ name: '' }, ...(counties || [])])
  )

  constructor(
    private store: Store<AppState>,
    private answersService: AnswersService,
    private translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants,
    @Inject(TABLE_COLUMNS) rawTableColumns: TableColumn[],
  ) {
    this.translateColumnNames(rawTableColumns);
    this.store.dispatch(new LoadAnswerPreviewAction());
  }

  ngOnInit() {
    this.formState = this.store.pipe(select(state => state.form));
    this.store
      .pipe(
        select(s => s.county),
        take(1),
        map(_ => new CountyAnswersFetchAction())
      )
      .subscribe(action => this.store.dispatch(action));
  }

  requestFilteredData(filters) {
    this.store.dispatch(updateFilters(filters));
    this.store.dispatch(new LoadAnswerPreviewAction(1, undefined, true));
  }

  onPageChanged(event) {
    this.store.dispatch(new LoadAnswerPreviewAction(event.page, event.pageSize, true));
  }

  onSortedColumnClicked({ col, sortDirection }: SortedColumnEvent) {
    console.log(col, sortDirection);

    // TODO: call proper API
  }

  onResetFilters() {
    this.store.dispatch(updateFilters({}));
    this.store.dispatch(new LoadAnswerPreviewAction(1, undefined, true));
  }

  onRowClicked({ observerId, pollingStationId }: AnswerThread) {
    this.router.navigate([observerId, pollingStationId], { relativeTo: this.activatedRoute });
    this.store.dispatch(new LoadAnswerDetailsAction(observerId, pollingStationId));
    this.store.dispatch(new FormLoadAction());
  }

  refreshAnswers() {
    this.store.dispatch(new LoadAnswerPreviewAction(1, undefined, true));
  }

  private isValidValue(value) {
    return value !== null && value !== '';
  }

  downloadAnswers(rawFilters) {
    if (!confirm(this.translate.instant('ANSWERS_DOWNLOAD_CONFIRMATION'))) {
      return;
    }

    const filter = this.mapFilterKeys(rawFilters);

    this.isLoading = true;
    return this.answersService.downloadAnswers(filter).subscribe(res => {
      this.isLoading = false;
      FileSaver.saveAs(res, 'data.csv');
    }, error => {
      this.isLoading = false;
    });
  }

  downloadNotes(rawFilters) {
    if (!confirm(this.translate.instant('ANSWERS_DOWNLOAD_CONFIRMATION'))) {
      return;
    }

    const filter = this.mapFilterKeys(rawFilters);

    this.isLoading = true;
    return this.answersService.downloadNotes(filter)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(res => FileSaver.saveAs(res, 'notes-data.csv'));
  }

  private mapFilterKeys(rawFilters) {
    const filterWordsDict = {
      county: 'county',
      pollingStationNumber: 'pollingStationNumber',
      observerPhoneNumber: 'phoneObserver',
      urgent: 'urgent',
      fromTime: 'from',
      toTime: 'to',
    };

    const filter: AnswersPackFilter = {};

    for (const rawKey in rawFilters) {
      if (rawFilters.hasOwnProperty(rawKey)) {
        const rawValue = rawFilters[rawKey];
        const key = filterWordsDict[rawKey];

        if (this.isValidValue(rawValue)) {
          filter[key] = rawValue;
        }
      }
    }
    return filter;
  }

  private translateColumnNames(rawTableColumns: TableColumn[]) {
    this.tableColumns = rawTableColumns.map(
      ({ name, ...rest }) => ({ ...rest, name: this.translate.get(name) })
    );
  }
}
