import { BaseAnswer } from './base.answer.model';
import {BaseQuestion} from './base.question.model';

export class FormQuestion extends BaseQuestion {
    id: number;
    formCode: string;
    code: string;
    idSection: number;
    questionType: number;
    text: string;
    hint: string;
    optionsToQuestions: BaseAnswer[];
}

export const QUESTION_TYPES = [
  {
    id: 0,
    name: 'MULTIPLE_CHOICE'
  },
  {
    id: 1,
    name: 'SINGLE_CHOICE'
  },
  {
    id: 2,
    name: 'SINGLE_CHOICE_TEXT'
  },
  {
    id: 3,
    name: 'MULTIPLE_CHOICE_TEXT'
  }
];

export interface QuestionType {
  id: number;
  name: string;
}
