import { NoteActions, NoteActionTypes, setLoadingStatusFromEffects } from './note.actions';
import { Note } from '../../models/note.model';
export class NoteState {
    notes: Note[];
    loading = false;
    error = false;
    idObserver: number = undefined;
    idPollingStation: number = undefined;
}
export let noteInitialState = new NoteState();

export function noteReducer(state = noteInitialState, action: NoteActions | any) {
    switch (action.type) {
        case NoteActionTypes.LOAD:
            return {
                ...state,
                // loading: true,
                error: false,
                idObserver: action.payload.idObserver,
                idPollingStation: action.payload.idPollingStation
            };
        case NoteActionTypes.LOAD_DONE:
            return Object.assign({}, state, {
                notes: action.payload.map(
                    n => ({ ...n, attachmentsPaths: n.attachmentsPaths.map(a => ({ src: a, isImage: a.endsWith('.jpg') })) })
                ),
                // loading: false,
                error: false
            });
        case setLoadingStatusFromEffects.type:
            return {
                ...state,
                loading: action.isLoading
            }
        default:
            return state;
    }
}
