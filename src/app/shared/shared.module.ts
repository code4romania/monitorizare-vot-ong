import { ErrorIndicatorComponent } from './error-indicator/error-indicator.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgbCollapseModule,
  NgbNavModule,
  NgbDropdownModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { IconToggleInputComponent } from './icon-toggle-input/icon-toggle-input.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbNavModule,
    RouterModule,
    TranslateModule,
    NgbTooltipModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbCollapseModule,
    NgbNavModule,
    NgbDropdownModule,
    RouterModule,
    PaginationComponent,
    LoadingIndicatorComponent,
    ErrorIndicatorComponent,
    TranslateModule,
    IconToggleInputComponent,
    NgbTooltipModule
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
