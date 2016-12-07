import { RouterModule } from '@angular/router';
import { TabsModule } from 'ng2-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { UIRouterModule } from 'ui-router-ng2/ng2';
import { PaginationComponent } from './pagination/pagination.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { ErrorIndicatorComponent } from './error-indicator/error-indicator.component';

@NgModule({
    imports: [FormsModule, CommonModule, PaginationModule, TabsModule, RouterModule],
    exports: [FormsModule, CommonModule, PaginationModule, TabsModule, RouterModule, PaginationComponent, LoadingIndicatorComponent, ErrorIndicatorComponent],
    declarations: [PaginationComponent, LoadingIndicatorComponent, ErrorIndicatorComponent],
})
export class SharedModule {

}