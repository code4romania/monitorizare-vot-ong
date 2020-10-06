import { ErrorIndicatorComponent } from './error-indicator/error-indicator.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranslateModule } from '@ngx-translate/core';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import { IconToggleInputComponent } from './icon-toggle-input/icon-toggle-input.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
@NgModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      CollapseModule,
      TabsModule.forRoot(),
      RouterModule,
      TranslateModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        CollapseModule,
        TabsModule,
        RouterModule,
        PaginationComponent,
        LoadingIndicatorComponent,
        ErrorIndicatorComponent,
        TranslateModule,
        IconToggleInputComponent
    ],
    declarations: [
      PaginationComponent,
      LoadingIndicatorComponent,
      ErrorIndicatorComponent,
      IconToggleInputComponent,
      ConfirmationModalComponent],
    providers: []
})
export class SharedModule {

}
