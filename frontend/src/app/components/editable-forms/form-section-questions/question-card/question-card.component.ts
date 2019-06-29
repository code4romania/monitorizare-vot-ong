import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EditableFormQuestion} from '../../../../models/editable.form.question.model';
import {EditableFormSection} from '../../../../models/editable.form.section.model';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {
  @Input() private section: EditableFormSection;
  @Input() private question: EditableFormQuestion;
  @Input() private editMode: boolean = false;
  @Output() deleteQuestion = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  deleteQuestionHandler(){
    this.deleteQuestion.emit(this.question.id);
  }

}
