import { SharedModule } from '../shared/shared.module';
import { AnswersComponent } from './answers.component';
import { AnswersViewComponent } from './answers-view/answers-view.component';
import routes from './answers.routes';
import { AnswersListComponent } from './answers-list/answers-list.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AnswersListComponent, AnswersComponent, AnswersViewComponent]
})
export class AnswersModule { }
