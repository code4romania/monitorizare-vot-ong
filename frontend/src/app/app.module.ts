import { AppRoutingModule } from './routing/app.routing.module';
import { components, ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AnswersService } from './services/answers.service';
import { SharedModule } from './shared/shared.module';
import { AppStoreModule } from './store/store.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations:[AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    SharedModule,
    AppStoreModule,
    AppRoutingModule,
    ComponentsModule,
  ],

  providers: [
    AnswersService
  ],

  bootstrap: [AppComponent]
})

export class AppModule {
}
