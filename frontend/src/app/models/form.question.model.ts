import { BaseAnswer } from './base.answer.model';
import { BaseQuestion } from './base.question.model';
export class FormQuestion extends BaseQuestion {
    idSection: number;
    hint: string;
    optionsToQuestions: BaseAnswer[];
}