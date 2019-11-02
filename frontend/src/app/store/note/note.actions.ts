import { Note } from '../../models/note.model';
import { Action } from '@ngrx/store';
import { actionType } from '../util';
export class NoteActionTypes {
    static readonly LOAD = actionType('[Note] Load')
    static readonly LOAD_DONE = actionType('[Note] Load done')
}
export class LoadNotesAction implements Action {
    readonly type = NoteActionTypes.LOAD

    payload: {
        idPollingStation: number
        idObserver: number
    }
    constructor(idPollingStation: number, idObserver: number) {
        this.payload = {
            idPollingStation,
            idObserver
        }
    }
}
export class LoadNotesDoneAction implements Action {
    readonly type = NoteActionTypes.LOAD_DONE
    payload: Note[]
    constructor(note: Note[]) {
        this.payload = note;
    }
}
export type NoteActions = LoadNotesAction | LoadNotesDoneAction