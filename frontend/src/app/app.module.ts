import { AppComponent } from './app.component';
import { appRoutes } from './app.states';
import { uiComponents } from './components/components';
import { CoreModule } from './core/core.module';
import { AnswersService } from './services/answers.service';
import { SharedModule } from './shared/shared.module';
import { AppStoreModule } from './store/store.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UIRouterModule } from 'ui-router-ng2/ng2';




// let components = uiComponents.concat([AppComponent]);

@NgModule({
  declarations: uiComponents,
  imports: [
    CoreModule,
    BrowserModule,
    SharedModule,
    UIRouterModule.forRoot({
      states: appRoutes,
      otherwise: '/'
    }),
    AppStoreModule
  ],

  providers: [
    AnswersService
  ],

  bootstrap: [AppComponent]
})

export class AppModule {
}
