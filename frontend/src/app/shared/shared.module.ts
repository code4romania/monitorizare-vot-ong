import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';

@NgModule({
    imports: [HttpModule, MaterialModule, FormsModule, RouterModule, CommonModule, LayoutModule],
    exports: [HttpModule, MaterialModule, FormsModule, RouterModule, CommonModule, LayoutModule],
})
export class SharedModule {

}