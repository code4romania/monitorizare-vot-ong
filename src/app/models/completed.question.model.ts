import { CompletedAnswer } from './completed.answer.model';
import { BaseQuestion } from './base.question.model';

export interface CompletedQuestion extends BaseQuestion {
  answers: CompletedAnswer[];
}

export interface CompletedQuestionMapped extends BaseQuestion {
  answers: {[prop: number]: CompletedAnswer};
}

export interface CompletedQuestionMap {
  [prop: number]: CompletedQuestionMapped
}
