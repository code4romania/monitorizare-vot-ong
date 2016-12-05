import { AppComponent } from '../app.component';

import { SharedModule } from '../shared/shared.module';
import { AnswerComponent } from './answer/answer.component';
import { AnswerListComponent } from './answer/answers-list/answer-list.component';
import { HeaderComponent } from './header/header.component';
import { StatisticsDetailsComponent } from './statistics-details/statistics-details.component';
import { StatisticsTopComponent } from './statistics-top/statistics-top.component';
import { NgModule } from '@angular/core';

export let components = [
    AppComponent,

    AnswerComponent, AnswerListComponent,
    //  AnswerDetailsComponent, AnswerNotesComponent,

    HeaderComponent,

    StatisticsTopComponent, StatisticsDetailsComponent
] 