import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EditableFormQuestion} from '../../../../models/editable.form.question.model';
import {EditableFormSection} from '../../../../models/editable.form.section.model';
import {QuestionType} from '../../../../models/editable.form.question.type';

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
  @Output() updateQuestion = new EventEmitter<EditableFormQuestion>();

  private questionTypes:QuestionType[] = QuestionType.values();
  constructor() { }

  ngOnInit() {
  }

  onDeleteQuestion(){
    this.deleteQuestion.emit(this.question.id);
  }

  onTextChange(){
    this.updateQuestion.emit(this.question);
  }

  onTypeChange(){
    this.updateQuestion.emit(this.question);
  }
}
