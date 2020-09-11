import {Component, ComponentFactoryResolver, EventEmitter, Input, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {FormSection} from '../../../models/form.section.model';
import {FormQuestion} from '../../../models/form.question.model';
import {QuestionComponent} from '../question/question.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  @ViewChild('question', {read: ViewContainerRef}) question: ViewContainerRef;

  @Input() section: FormSection;

  @Output() sectionDeleteEventEmitter = new EventEmitter<any>();

  currentQuestion: FormQuestion;

  constructor(private cfr: ComponentFactoryResolver) { }

  addQuestion() {
    console.log(this.section);

    if (!this.section.questions) {
      this.section.questions = [];
    }
    this.section.questions.push(new FormQuestion());
    this.currentQuestion = this.section.questions[this.section.questions.length - 1];
    this.currentQuestion.questionType = 4;
    this.loadQuestionComponent(this.currentQuestion);
  }

  async loadQuestionComponent(question: FormQuestion) {
    const component: any = QuestionComponent;

    const comp = this.question.createComponent(this.cfr.resolveComponentFactory<QuestionComponent>(component));

    comp.instance.currentQuestion = question;
    comp.instance.questionDeleteEventEmitter.subscribe(_ => {
      this.onQuestionDelete(question);
      comp.destroy();
    });

    return comp;
  }

  onQuestionDelete(question: FormQuestion) {
    this.section.questions = this.section.questions.filter(q => q !== question);
  }
}
