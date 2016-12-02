import { CategoricalQuestionComponent } from './categorical-question/categorical-question.component';
import { StatisticsService } from './statistics.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    imports: [FormsModule, RouterModule, CommonModule, PaginationModule],
    exports: [FormsModule, RouterModule, CommonModule, PaginationModule, CategoricalQuestionComponent],
    providers: [StatisticsService],
    declarations: [CategoricalQuestionComponent]
})
export class SharedModule {

}