import { SharedModule } from '../shared/shared.module';
import { AnswersComponent } from './answers.component';
import { AnswersViewComponent } from './answers-view/answers-view.component';
import { answersRoutes } from './answers.routes';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        SharedModule,
        answersRoutes
    ],
    declarations: [AnswersComponent, AnswersViewComponent]
})
export class AnswersModule { }
