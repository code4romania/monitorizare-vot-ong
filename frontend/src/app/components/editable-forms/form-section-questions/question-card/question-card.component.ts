import {Component, Input, OnInit} from '@angular/core';
import {EditableFormQuestion} from '../../../../models/editable.form.question.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/store.module';
import {EditableFormSection} from '../../../../models/editable.form.section.model';
import {EditableFormsDeleteFormQuestionAction} from '../../../../store/editable-forms/editable.forms.actions';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {
  @Input() private section: EditableFormSection;
  @Input() private question: EditableFormQuestion;
  @Input() private editMode: boolean = false;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  deleteQuestion(){
    this.store.dispatch(new EditableFormsDeleteFormQuestionAction({
      sectionId: this.section.code,
      questionId: this.question.id
    }));
  }

}
