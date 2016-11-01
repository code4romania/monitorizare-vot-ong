import { AnswersModule } from './answers/answers.module';
import { SimpleOutletComponent } from './shared/simple-outlet/simple-outlet.component';
import { AnswersViewComponent } from './answers/answers-view/answers-view.component';
import { Routes } from '@angular/router';
const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/raspunsuri/urgente',
        pathMatch: 'full'
    },
    {
        path: 'raspunsuri',
        component: SimpleOutletComponent,
        loadChildren: () => AnswersModule
    }
];
export default appRoutes;
