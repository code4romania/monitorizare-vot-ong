import { AnswersModule } from './answers/answers.module';
import { AnswersComponent } from './answers/answers.component';
import { AuthGuard } from './shared/authGuard/auth.guard';
import { SimpleOutletComponent } from './shared/simple-outlet/simple-outlet.component';
import { AnswersViewComponent } from './answers/answers-view/answers-view.component';
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
        loadChildren: lazyLoadAnswers,
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