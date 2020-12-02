import { FormQuestion } from 'src/app/models/form.question.model';
import {Note, NoteMap} from 'src/app/models/note.model';
import {CompletedQuestionMap} from '../models/completed.question.model';

export interface SectionsState {
  flaggedQuestions: { [k: number]: boolean },
  selectedAnswers: CompletedQuestionMap,
  formNotes: NoteMap,
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
