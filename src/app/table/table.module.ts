import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableContainerComponent } from './table-container/table-container.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  exports: [TableContainerComponent],
  declarations: [TableContainerComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class TableModule { }
