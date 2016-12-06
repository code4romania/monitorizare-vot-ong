import { AppRoutingModule } from './routing/app.routing.module';
import { components } from './components/components.module';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AnswersService } from './services/answers.service';
import { SharedModule } from './shared/shared.module';
import { AppStoreModule } from './store/store.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UIRouterModule } from 'ui-router-ng2/ng2';

@NgModule({
  declarations: components,
  imports: [
    CoreModule,
    BrowserModule,
    SharedModule,
    AppStoreModule,
    AppRoutingModule
  ],

  providers: [
    AnswersService
  ],

  bootstrap: [AppComponent]
})

export class AppModule {
}
