// This should be merged with form.model.ts
import {EditableFormSection} from './editable.form.section.model';

export class EditableForm{
  constructor(
    public id: number,
    public code: string,
    public sections: EditableFormSection[] = [],
    public description: string = '',
    public version: number = 1,
    public published: boolean = false
  ) {}
}
