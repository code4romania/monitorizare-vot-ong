import { FormQuestion } from './form.question.model';

export interface FormSection {
    uniqueId: string;
    id: number;
    code: string;
    description: string;
    questions: FormQuestion[];
}
