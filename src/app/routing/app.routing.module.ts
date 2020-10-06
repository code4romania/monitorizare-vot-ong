import { appRoutes } from './app.routes';
import { RouterModule } from '@angular/router';
import { LoadStatisticsGuard } from './guards/load-statistics.guard';
import { AnswerDetailsGuard } from './guards/load-anwer-details.guard';
import { AnswerListGuard } from './guards/load-answer-list.guard';
import { HomeGuard } from './guards/home.guard';
import { NgModule } from '@angular/core';
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false,
      // enableTracing: !environment.production
    }),
  ],
  providers: [
    HomeGuard,
    AnswerListGuard,
    AnswerDetailsGuard,
    LoadStatisticsGuard,
  ],
})
export class AppRoutingModule {}
