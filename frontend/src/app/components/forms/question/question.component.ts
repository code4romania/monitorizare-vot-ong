import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormQuestion, QUESTION_TYPES, QuestionType} from '../../../models/form.question.model';
import {BaseAnswer} from '../../../models/base.answer.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {
  hideOptions = false;

  @Input() currentQuestion: FormQuestion;
  @Output() questionDeleteEventEmitter = new EventEmitter<any>();

  questionTypes: QuestionType[];

  ngOnInit() {
    this.questionTypes = QUESTION_TYPES;
  }

  addOption() {
    if (!this.currentQuestion.optionsToQuestions) {
      console.log('Options array was uninitialized');
      this.currentQuestion.optionsToQuestions = [];
    }

    this.currentQuestion.optionsToQuestions.push(new BaseAnswer());
  }

  toggleOptions() {
    this.hideOptions = !this.hideOptions;
  }

  onOptionDelete(option: BaseAnswer) {
    this.currentQuestion.optionsToQuestions = this.currentQuestion.optionsToQuestions.filter(o => o !== option);
  }

  onReorder(event: CdkDragDrop<BaseAnswer[]>) {
    moveItemInArray(this.currentQuestion.optionsToQuestions, event.previousIndex, event.currentIndex);
  }
}
