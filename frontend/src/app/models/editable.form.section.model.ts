import {EditableFormQuestion} from './editable.form.question.model';

export class EditableFormSection{
  constructor(
    public id: number,
    public code: string,
    public uniqueId: string,
    public description: string = '',
    public questions: EditableFormQuestion[] = []
  ) {}
}
