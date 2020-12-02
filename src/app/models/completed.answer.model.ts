import { BaseAnswer } from './base.answer.model';

export interface CompletedAnswer extends BaseAnswer {
    value: string;
    flagged: boolean;
}

export interface CompletedAnswerMap {
  [prop: number]: CompletedAnswer;
}
