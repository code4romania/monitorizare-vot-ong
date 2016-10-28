import { AnswersViewComponent } from './answers/answers-view/answers-view.component';
import { AnswersComponent } from './answers/answers.component';
import { Routes } from '@angular/router';
const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/raspunsuri/urgente',
        pathMatch: 'full'
    },
    {
        path: 'raspunsuri',
        loadChildren:'./answers.module'
    }
];
export default appRoutes;
