import { StatisticsDetailsComponent } from './statistics/statistics-details/statistics-details.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AnswersModule } from './answers/answers.module';
import { AuthGuard } from './core/authGuard/auth.guard';
import { SimpleOutletComponent } from './shared/simple-outlet/simple-outlet.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export let appRoutes = RouterModule.forRoot([
    {
        path: '',
        canActivate: [],
        redirectTo: '/raspunsuri/urgente',
        pathMatch: 'full',
    },
    {
        path: 'raspunsuri',
        component: SimpleOutletComponent,
        loadChildren: 'app/answers/answers.module#AnswersModule',
        canActivate: [],
        canActivateChild: []
    }, {
        path: 'statistici',
        children: [{
            path: '',
            component: StatisticsComponent
        }, {
            path: 'detalii/:index',
            component: StatisticsDetailsComponent
        }]

    }], {
        enableTracing: false,
        preloadingStrategy: PreloadAllModules
    });;

function lazyLoadAnswers() {
    return AnswersModule;
}