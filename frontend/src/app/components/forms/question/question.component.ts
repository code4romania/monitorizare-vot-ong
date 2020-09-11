import {Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {FormQuestion, QUESTION_TYPES, QuestionType} from '../../../models/form.question.model';
import {BaseAnswer} from '../../../models/base.answer.model';
import {OptionComponent} from '../option/option.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {
  @ViewChild('option', {read: ViewContainerRef}) option: ViewContainerRef;
  showOptions: boolean;

  @Input() currentQuestion: FormQuestion;
  @Output() questionDeleteEventEmitter = new EventEmitter<any>();

  currentOption: BaseAnswer;

  questionTypes: QuestionType[];

  constructor(private cfr: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.questionTypes = QUESTION_TYPES;
  }

  addOption() {
    console.log(this.currentQuestion);

    if (!this.currentQuestion.optionsToQuestions) {
      console.log('Options array was uninitialized');
      this.currentQuestion.optionsToQuestions = [];
    }

    this.currentOption = new BaseAnswer();
    this.currentOption.isFreeText = false;
    this.currentQuestion.optionsToQuestions.push(this.currentOption);
    this.loadOptionComponent(this.currentOption);
  }

  async loadOptionComponent(option: BaseAnswer) {
    const component: any = OptionComponent;

    const comp = this.option.createComponent(this.cfr.resolveComponentFactory<OptionComponent>(component));

    comp.instance.currentOption = option;
    comp.instance.optionDeleteEventEmitter.subscribe(_ => {
      this.onOptionDelete(option);
      comp.destroy();
    });

    return comp;
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  onOptionDelete(option: BaseAnswer) {
    this.currentQuestion.optionsToQuestions = this.currentQuestion.optionsToQuestions.filter(o => o !== option);
  }

  onReorder(event: DragEvent) {

  }
}
