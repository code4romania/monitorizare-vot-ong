import { CategoricalQuestionComponent } from './categorical-question/categorical-question.component';
import { StatisticsService } from './statistics.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { UIRouterModule } from 'ui-router-ng2/ng2';

@NgModule({
    imports: [FormsModule, UIRouterModule, CommonModule, PaginationModule],
    exports: [FormsModule, UIRouterModule, CommonModule, PaginationModule, CategoricalQuestionComponent],
    providers: [StatisticsService],
    declarations: [CategoricalQuestionComponent]
})
export class SharedModule {

}