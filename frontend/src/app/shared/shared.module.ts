import { PaginatorFactory } from './paginator/paginator.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgSemanticModule  } from 'ng-semantic';
import { RouterModule } from '@angular/router';
import { SimpleOutletComponent } from './simple-outlet/simple-outlet.component';

@NgModule({
    imports: [HttpModule, NgSemanticModule , FormsModule, RouterModule, CommonModule],
    exports: [HttpModule, NgSemanticModule , FormsModule, RouterModule, CommonModule],
    providers: [PaginatorFactory],
    declarations: [SimpleOutletComponent]
})
export class SharedModule {

}