import { StatisticsService } from './statistics/statistics.service';
import { StatisticsComponent } from './statistics/statistics.component';
import { HeaderComponent } from './header/header.component';
import { map } from 'rxjs/operator/map';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { StatisticsDetailsComponent } from './statistics/statistics-details/statistics-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StatisticsComponent, StatisticsDetailsComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    SharedModule,
    appRoutes,
  ],

  providers: [
    StatisticsService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
