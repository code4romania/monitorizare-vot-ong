import { SharedModule } from '../shared/shared.module';
import { AnswerDetailsComponent } from './answer-details/answer-details.component';
import { AnswerNotesComponent } from './answer-notes/answer-notes.component';
import { AnswersComponent } from './answers/answers.component';
import { AnswersListComponent } from './answers-list/answers-list.component';
import { HeaderComponent } from './header/header.component';
import { StatisticsDetailsComponent } from './statistics-details/statistics-details.component';
import { StatisticsTopComponent } from './statistics-top/statistics-top.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        AnswersComponent, AnswersListComponent, AnswerDetailsComponent, AnswerNotesComponent,

        HeaderComponent,

        StatisticsTopComponent, StatisticsDetailsComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
    ],
    exports: [
        AnswersComponent, AnswersListComponent, AnswerDetailsComponent, AnswerNotesComponent,

        HeaderComponent,

        StatisticsTopComponent, StatisticsDetailsComponent
    ]
})
export class ComponentsModule {

}