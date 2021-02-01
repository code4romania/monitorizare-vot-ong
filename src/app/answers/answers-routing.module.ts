import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerDetailsComponent } from './answer-details/answer-details.component';
import { AnswerNotificationComponent } from './answer-notification/answer-notification.component';
import { AnswersComponent } from './answers/answers.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AnswersComponent,
  },
  {
    path: ':observerId/:pollingStationId',
    component: AnswerDetailsComponent
  },
  {
    path: ':observerId/:pollingStationId/notification',
    component: AnswerNotificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnswersRoutingModule { }
