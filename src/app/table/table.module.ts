import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableContainerComponent } from './table-container/table-container.component';
import { SharedModule } from '../shared/shared.module';
import { TableColumnDirective } from './table-column/table-column.directive';

@NgModule({
  exports: [TableContainerComponent, TableColumnDirective],
  declarations: [TableContainerComponent, TableColumnDirective],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class TableModule { }
