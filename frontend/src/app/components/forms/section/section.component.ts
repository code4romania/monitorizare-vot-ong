import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {FormSection} from '../../../models/form.section.model';
import {FormQuestion, QUESTION_TYPES} from '../../../models/form.question.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  @Input() section: FormSection;

  @Output() sectionDeleteEventEmitter = new EventEmitter<any>();

  addQuestion() {
    if (!this.section.questions) {
      this.section.questions = [];
    }

    const createdQuestion = new FormQuestion();
    createdQuestion.questionType = QUESTION_TYPES[0].id;

    this.section.questions.push(createdQuestion);
  }

  onQuestionDelete(question: FormQuestion) {
    this.section.questions = this.section.questions.filter(q => q !== question);
  }

  onReorder(event: CdkDragDrop<FormQuestion[]>) {
    moveItemInArray(this.section.questions, event.previousIndex, event.currentIndex);
  }
}
