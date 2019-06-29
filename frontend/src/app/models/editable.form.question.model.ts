import {EditableFormQuestionOption} from './editable.form.question.option.model';

export class EditableFormQuestion{
  constructor(
    public id: number,
    public formId: number,
    public code: number,
    public text: string,
    public typeId: number,
    public options: EditableFormQuestionOption[]
  ) {}
}