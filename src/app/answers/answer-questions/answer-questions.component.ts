import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';
import { SectionsState } from '../answers.model';

@Component({
  selector: 'app-answer-questions',
  templateUrl: './answer-questions.component.html',
  styleUrls: ['./answer-questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerQuestionsComponent implements OnInit {
  @Input() sections = [];
  @Input() sectionsState: SectionsState;

  shownNotes: { [k: string]: boolean } = {};

  constructor (
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants
  ) { }

  ngOnInit(): void {
  }

}
