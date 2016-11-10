import { AnswersModule } from './answers/answers.module';
import { SimpleOutletComponent } from './shared/simple-outlet/simple-outlet.component';
import { AnswersViewComponent } from './answers/answers-view/answers-view.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export let appRoutes = RouterModule.forRoot([
    {
        path: '',
        redirectTo: '/raspunsuri/urgente',
        pathMatch: 'full'
    },
    {
        path: 'raspunsuri',
        component: SimpleOutletComponent,
        loadChildren: answersLazyLoad
    }
], {
        enableTracing: false,
        preloadingStrategy: PreloadAllModules
    });;
    
export function answersLazyLoad(){
    return AnswersModule;
}