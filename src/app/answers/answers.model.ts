import { FormQuestion } from 'src/app/models/form.question.model';
import { Note } from 'src/app/models/note.model';

export interface SectionsState {
  flaggedQuestions: { [k: string]: FormQuestion },
  selectedAnswers: { [k: string]: any },
  formNotes: { [k: string]: Note },
}