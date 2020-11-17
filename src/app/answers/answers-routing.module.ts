import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerDetailsComponent } from './answer-details/answer-details.component';
import { AnswersComponent } from './answers/answers.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AnswersComponent,
  },
  {
    path: ':idObserver/:idPollingStation',
    component: AnswerDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnswersRoutingModule { }
