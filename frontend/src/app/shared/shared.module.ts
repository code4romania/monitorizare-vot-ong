import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StatisticsService} from './statistics.service';

@NgModule({
    imports: [FormsModule, RouterModule, CommonModule],
    exports: [FormsModule, RouterModule, CommonModule],
    providers:[StatisticsService]
})
export class SharedModule {

}