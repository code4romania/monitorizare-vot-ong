import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormSection} from '../../../models/form.section.model';
import {FormQuestion} from '../../../models/form.question.model';
import {QuestionComponent} from '../question/question.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  @Input() section: FormSection;

  @Output() sectionDeleteEventEmitter = new EventEmitter<any>();

  addQuestion() {
    console.log(this.section);

    if (!this.section.questions) {
      this.section.questions = [];
    }
    this.section.questions.push(new FormQuestion());
  }

  onQuestionDelete(question: FormQuestion) {
    this.section.questions = this.section.questions.filter(q => q !== question);
  }
}
