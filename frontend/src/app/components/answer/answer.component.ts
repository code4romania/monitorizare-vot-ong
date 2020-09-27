
import {map, take, distinctUntilChanged} from 'rxjs/operators';
import { LoadAnswerDetailsAction, LoadAnswerPreviewAction } from '../../store/answer/answer.actions';
import { AnswerState } from '../../store/answer/answer.reducer';
import { FormState } from '../../store/form/form.reducer';
import { AppState } from '../../store/store.module';
import { AnswersService, AnswersPackFilter } from '../../services/answers.service';
import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import { TranslateService } from '@ngx-translate/core';


@Component({
    templateUrl: './answer.component.html',
    styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

    answerState: Observable<AnswerState>;
    formState: Observable<FormState>;

    countyCode: string;
    pollingStationNumber: string;
    observerId: number;
    isUrgent: boolean;
    fromTime: string;
    toTime: string;

    constructor(private store: Store<AppState>,
                private answersService: AnswersService,
                private translate: TranslateService) { }

    ngOnInit() {
        this.formState = this.store.pipe(select(state => state.form), distinctUntilChanged());
        this.answerState = this.store.pipe(select(state => state.answer), distinctUntilChanged());

        this.answerState.subscribe(value => {
            this.isUrgent = value.urgent || false;
            this.countyCode = value.answerFilters.county;
            this.pollingStationNumber = value.answerFilters.pollingStationNumber;
            this.observerId = value.answerFilters.observerId;
        });
    }

    requestFilteredData() {
        this.store.dispatch(new LoadAnswerPreviewAction(this.isUrgent, 1, 5, true, {
            observerId: this.observerId,
            pollingStationNumber: this.pollingStationNumber,
            county: this.countyCode
        }));

    }

    redoAnswerListAction() {
        // take the current state of the answerState, and do a reloaded
        this.store.pipe(select(state => state.answer), take(1),
            map(s => new LoadAnswerPreviewAction(s.urgent, s.page, s.pageSize, true, s.answerFilters)),
            map(a => this.store.dispatch(a)), ).subscribe();
    }

    redoAnswerDetailsAction() {
        // take the current state of the answerState, and do a reloaded
        this.store.pipe(select(state => state.answer), take(1),
            map(s => new LoadAnswerDetailsAction(s.observerId, s.sectionId)),
            map(a => this.store.dispatch(a)), )
            .subscribe();
    }

    pageChanged(event) {
        this.store.pipe(select(s => s.answer), take(1),
            map(s => new LoadAnswerPreviewAction(s.urgent, event.page, event.pageSize, false, s.answerFilters)),
            map(a => {
                this.store.dispatch(a);
            }), )
            .subscribe();
    }

    resetFilters(): void {
        this.countyCode = null;
        this.pollingStationNumber = null;
        this.observerId = null;
        this.fromTime = null;
        this.toTime = null;
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

        if (this.isValidValue(this.observerId)) {
            filter.idObserver = this.observerId;
        }

        if (this.isValidValue(this.fromTime)) {
            filter.from = this.fromTime;
        }

        if (this.isValidValue(this.toTime)) {
            filter.to = this.toTime;
        }

        return this.answersService.downloadAnswers(filter).subscribe(res => {
            FileSaver.saveAs(res, 'anwsers.xlsx');

            const blob = new Blob([res], { type: 'application/octet-stream' });
            const url= window.URL.createObjectURL(blob);
            window.open(url);
        });
    }

}
