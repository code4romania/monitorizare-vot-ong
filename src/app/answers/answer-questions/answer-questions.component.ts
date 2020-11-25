import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Inject, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
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

  @ViewChildren('question') questionsDivs: QueryList<ElementRef>;

  shownNotes: { [k: string]: boolean } = {};

  constructor (
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants
  ) { }

  ngAfterViewInit () {
    if (!this.scrolledQuestionId) {
      return;
    }
    let { nativeElement: divToScrollTo } = this.questionsDivs.find(item => +item.nativeElement.dataset.questionId === this.scrolledQuestionId);
    this.scrolledQuestionId = null;

    (divToScrollTo as HTMLDivElement).scrollIntoView();
    divToScrollTo = null;
  }

}
