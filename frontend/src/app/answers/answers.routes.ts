import { AnswersComponent } from './answers.component';
import { Routes } from '@angular/router';
import { AnswersViewComponent } from './answers-view/answers-view.component';

const answersRoutes: Routes = [
    {
        path: 'raspunsuri',
        component: AnswersComponent,
        children: [
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
        ]

    },

];
export default answersRoutes;
