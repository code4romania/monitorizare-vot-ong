import { getRequestState } from '../shared/request.state';
import { FORMS_ERROR, FORMS_LOAD, FORMS_LOADED } from './forms.actions';
import { FormsState } from './forms.state';
import { Action } from '@ngrx/store';


export function formsReducer(state: FormsState, action: Action): FormsState {
    switch (action.type) {
        case FORMS_LOAD:
            return {
                data: undefined,
                request: getRequestState(true)
            }
        case FORMS_LOADED:
            return {
                data: action.payload,
                request: getRequestState(false)
            }
        case FORMS_ERROR:
            return {
                data: undefined,
                request: getRequestState(false, action.payload)
            }
        default:
            return state
    }
}
