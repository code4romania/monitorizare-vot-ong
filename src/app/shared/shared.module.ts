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
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { BaseButtonComponent } from './base-button/base-button.component';
import { BaseCheckboxComponent } from './base-checkbox/base-checkbox.component';
import { BaseDropdownComponent } from './base-dropdown/base-dropdown.component';

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
    NgbTooltipModule,
    BaseButtonComponent,
    BaseCheckboxComponent,
    BaseDropdownComponent,
  ],
  declarations: [
    PaginationComponent,
    LoadingIndicatorComponent,
    ErrorIndicatorComponent,
    IconToggleInputComponent,
    ConfirmationModalComponent,
    BaseButtonComponent,
    BaseCheckboxComponent,
    BaseDropdownComponent,
  ],
  providers: [],
})
export class SharedModule {}
