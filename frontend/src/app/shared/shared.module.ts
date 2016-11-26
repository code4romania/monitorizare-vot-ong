import { PaginatorFactory } from './paginator/paginator.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SimpleOutletComponent } from './simple-outlet/simple-outlet.component';

@NgModule({
    imports: [FormsModule, RouterModule, CommonModule],
    exports: [FormsModule, RouterModule, CommonModule],
    providers: [PaginatorFactory],
    declarations: [SimpleOutletComponent],
})
export class SharedModule {

}