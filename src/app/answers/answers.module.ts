import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswersRoutingModule } from './answers-routing.module';
import { AnswersComponent } from './answers/answers.component';
import { TableModule } from '../table/table.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { AnswerDetailsComponent } from './answer-details/answer-details.component';
import { AnswerNotificationComponent } from './answer-notification/answer-notification.component';
import { AnswerQuestionsComponent } from './answer-questions/answer-questions.component';
import { NotesComponent } from './notes/notes.component'

@NgModule({
  declarations: [AnswersComponent, AnswerDetailsComponent, AnswerNotificationComponent, AnswerQuestionsComponent, NotesComponent],
  imports: [
    CommonModule,
    AnswersRoutingModule,
    FormsModule,
    TableModule,
    SharedModule,
  ]
})
export class AnswersModule { }
