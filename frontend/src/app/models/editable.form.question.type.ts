export class QuestionType{
  static readonly SINGLE_CHOICE = new QuestionType(1, 'Single choice');
  static readonly MULTIPLE_CHOICE = new QuestionType(0, 'Multiple choice');
  static readonly SINGLE_CHOICE_TEXT = new QuestionType(2, 'Single choice with text');
  static readonly MULTIPLE_CHOICE_TEXT = new QuestionType(3, 'Multiple choice with text');

  static values():QuestionType[]{
    return [QuestionType.SINGLE_CHOICE, QuestionType.MULTIPLE_CHOICE, QuestionType.SINGLE_CHOICE_TEXT, QuestionType.MULTIPLE_CHOICE_TEXT];
  }

  constructor(public id: number, public text: string){};
}
