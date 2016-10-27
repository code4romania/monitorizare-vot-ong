import { Paginator } from './paginator/paginator.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [HttpModule, MaterialModule, FormsModule, RouterModule, CommonModule],
    exports: [HttpModule, MaterialModule, FormsModule, RouterModule, CommonModule],
    providers: [Paginator]
})
export class SharedModule {

}