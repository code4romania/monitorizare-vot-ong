import { ErrorIndicatorComponent } from './error-indicator/error-indicator.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { IconToggleInputComponent } from './icon-toggle-input/icon-toggle-input.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbCollapseModule,
    NgbTabsetModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbCollapseModule,
    NgbTabsetModule,
    RouterModule,
    PaginationComponent,
    LoadingIndicatorComponent,
    ErrorIndicatorComponent,
    TranslateModule,
    IconToggleInputComponent,
  ],
  declarations: [
    PaginationComponent,
    LoadingIndicatorComponent,
    ErrorIndicatorComponent,
    IconToggleInputComponent,
  ],
  providers: [],
})
export class SharedModule {}
