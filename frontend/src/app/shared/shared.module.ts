import { ErrorIndicatorComponent } from './error-indicator/error-indicator.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabsModule, CollapseModule } from 'ngx-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
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
      TranslateModule
    ],
    declarations: [PaginationComponent, LoadingIndicatorComponent, ErrorIndicatorComponent],
    providers: []
})
export class SharedModule {

}
