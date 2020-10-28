import { CompletedAnswer } from './completed.answer.model';
import { BaseQuestion } from './base.question.model';
export class CompletedQuestion extends BaseQuestion {
    answers: CompletedAnswer[];
}
