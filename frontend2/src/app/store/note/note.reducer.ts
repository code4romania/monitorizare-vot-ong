import { NoteActions, NoteActionTypes } from './note.actions';
import { Note } from '../../models/note.model';

export class NoteState {
  notes: Note[] = [];
  loading = false;
  error = false;
  observerId: number = undefined;
  sectionId: number = undefined;
}

export let noteInitialState = new NoteState();

export function noteReducer(state = noteInitialState, action: NoteActions) {
  switch (action.type) {
    case NoteActionTypes.LOAD:
      return {
        notes: [],
        loading: true,
        error: false,
        observerId: action.payload.observerId,
        sectionId: action.payload.sectionId
      };
    case NoteActionTypes.LOAD_DONE:
      return Object.assign({}, state, {
        notes: action.payload,
        loading: false,
        error: false
      });
    default:
      return state;
  }
}
