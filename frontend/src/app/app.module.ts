import { map } from 'rxjs/operator/map';
import { SharedModule } from './shared/shared.module';
import { AnswersModule } from './answers/answers.module';
import { HeaderModule } from './header/header.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    HeaderModule,
    AnswersModule,
    BrowserModule,
    SharedModule,
    appRoutes
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
