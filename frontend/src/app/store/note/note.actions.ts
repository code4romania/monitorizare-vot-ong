import { Note } from '../../models/note.model';
import { Action } from '@ngrx/store';
import { actionType } from '../util';
export const NoteActionTypes = {
    LOAD: actionType('[Note] Load'),
    LOAD_DONE: actionType('[Note] Load done')
}
export class LoadNotesAction implements Action {
    type = NoteActionTypes.LOAD

    payload: {
        sectionId: number
        observerId: number
    }
    constructor(sectionId: number, observerId: number) {
        this.payload = {
            sectionId,
            observerId
        }
    }
}
export class LoadNotesDoneAction implements Action {
    type = NoteActionTypes.LOAD_DONE
    payload: Note[]
    constructor(note: Note[]) {
        this.payload = note;
    }
}
export type NoteActions = LoadNotesAction | LoadNotesDoneAction