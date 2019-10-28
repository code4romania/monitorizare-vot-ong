export class EditableFormQuestionOption{
  constructor(
    public id: number,
    public text: string,
    public isTextOption: boolean,
    public isFlagged: boolean = false
  ) {}
}
