import { FormQuestion } from 'src/app/models/form.question.model';
import { Note } from 'src/app/models/note.model';

export interface SectionsState {
  flaggedQuestions: { [k: string]: FormQuestion },
  selectedAnswers: { [k: string]: any },
  formNotes: { [k: string]: Note },
}

export interface DisplayedNote extends Note {
  hasCorrespondingQuestion: boolean;
  tabName?: string;
  questionCode?: string;
  isQuestionFlagged?: boolean;
}

// export interface NoteWithoutQuestion extends Note {
//   hasCorrespondingQuestion: false;
// }