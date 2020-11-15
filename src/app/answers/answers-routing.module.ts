import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerDetailComponent } from './answer-detail/answer-detail.component';
import { AnswersComponent } from './answers/answers.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AnswersComponent,
  },
  {
    path: ':idObserver/:idPollingStation',
    component: AnswerDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnswersRoutingModule { }
