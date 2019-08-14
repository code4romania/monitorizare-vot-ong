import {AppRoutingModule} from './routing/app.routing.module';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {AnswersService} from './services/answers.service';
import {SharedModule} from './shared/shared.module';
import {AppStoreModule} from './store/store.module';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations:[AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    SharedModule,
    AppStoreModule,
    AppRoutingModule,
    ComponentsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AnswersService,
  ],

  bootstrap: [AppComponent]
})

export class AppModule {
}
