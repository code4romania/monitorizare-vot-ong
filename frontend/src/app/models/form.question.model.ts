import { BaseAnswer } from './base.answer.model';

export class FormQuestion {
    id: number;
    formCode: string;
    code: string;
    idSection: number;
    questionType: number;
    text: string;
    hint: string;
    optionsToQuestions: BaseAnswer[];
}