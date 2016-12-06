import { TabsModule } from 'ng2-bootstrap';
import { CategoricalQuestionComponent } from './categorical-question/categorical-question.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { UIRouterModule } from 'ui-router-ng2/ng2';

@NgModule({
    imports: [FormsModule, CommonModule, PaginationModule, TabsModule],
    exports: [FormsModule, CommonModule, PaginationModule, TabsModule, CategoricalQuestionComponent],
    providers: [],
    declarations: [CategoricalQuestionComponent]
})
export class SharedModule {

}