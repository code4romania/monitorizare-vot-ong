import { AnswersModule } from './answers/answers.module';
import { AuthGuard } from './core/authGuard/auth.guard';
import { SimpleOutletComponent } from './shared/simple-outlet/simple-outlet.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export let appRoutes = RouterModule.forRoot([
    {
        path: '',
        canActivate: [AuthGuard],
        redirectTo: '/raspunsuri/urgente',
        pathMatch: 'full',
    },
    {
        path: 'raspunsuri',
        component: SimpleOutletComponent,
        loadChildren: 'app/answers/answers.module#AnswersModule',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    }
], {
        enableTracing: false,
        preloadingStrategy: PreloadAllModules
    });;

    function lazyLoadAnswers(){
        return AnswersModule;
    }