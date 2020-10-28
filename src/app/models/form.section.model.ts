import { FormQuestion } from './form.question.model';

export class FormSection {
    uniqueId: string;
    id: number;
    code: string;
    description: string;
    questions: FormQuestion[];
}
