import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';
import { DisplayedNote, SectionsState } from '../answers.model';

@Component({
  selector: 'app-answer-questions',
  templateUrl: './answer-questions.component.html',
  styleUrls: ['./answer-questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerQuestionsComponent implements AfterViewInit {
  @Input() sections = [];
  @Input() sectionsState: SectionsState;
  @Input('scrolled-question-id') scrolledQuestionId: number;

  @Output() showNoteClicked = new EventEmitter();

  @ViewChildren('question') questionsDivs: QueryList<ElementRef>;

  constructor (
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants
  ) { }

  ngAfterViewInit () {
    if (!this.scrolledQuestionId) {
      return;
    }
    
    // This cover the case when from `Notes` tab the user is redirected to a form tab
    // which is different than the previous one, shown exactly before the user had visited the `Notes` tab
    setTimeout(() => {
      let { nativeElement: divToScrollTo } = this.questionsDivs.find(item => +item.nativeElement.dataset.questionId === this.scrolledQuestionId);
      this.scrolledQuestionId = null;

      (divToScrollTo as HTMLDivElement).scrollIntoView();
      divToScrollTo = null;
    });
  }

}
