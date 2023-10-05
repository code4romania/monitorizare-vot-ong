import { NoteActions, NoteActionTypes, setLoadingStatusFromEffects } from './note.actions';
import { Note } from '../../models/note.model';
export class NoteState {
    notes: Note[];
    loading = false;
    error = false;
    observerId: number = undefined;
    pollingStationId: number = undefined;
}
export let noteInitialState = new NoteState();

const baseUrl = url => url.indexOf('?') === -1 ? url : url.slice(0, url.indexOf('?'));
function attachmentIsImage(path: string) {
  path = baseUrl(path);
  const isImage = path.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/i);

  return isImage;
}

export function noteReducer(state = noteInitialState, action: NoteActions | any) {
    switch (action.type) {
        case NoteActionTypes.LOAD:
            return {
                ...state,
                // loading: true,
                error: false,
                observerId: action.payload.observerId,
                pollingStationId: action.payload.pollingStationId
            };
        case NoteActionTypes.LOAD_DONE:
            return Object.assign({}, state, {
                notes: action.payload.map(
                    n => ({ ...n, attachmentsPaths: n.attachmentsPaths.map(a => ({ src: a, isImage: attachmentIsImage(a) })) })
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
