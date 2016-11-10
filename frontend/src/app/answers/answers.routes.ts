import { AnswersComponent } from './answers.component';
import { RouterModule, Routes } from '@angular/router';
import { AnswersViewComponent } from './answers-view/answers-view.component';

export let answersRoutes = RouterModule.forChild([
    {
        path: '',
        component: AnswersViewComponent,
        data: {
            urgent: false
        }
    },
    {
        path: 'urgente',
        component: AnswersViewComponent,
        data: {
            urgent: true,
        },
    }

]);