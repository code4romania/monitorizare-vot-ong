import { FormActions, FormActionTypes, FormLoadCompletedAction } from './form.actions';
import { Form } from '../../models/form.model';
import * as _ from 'lodash';


export class FormState {
    items: Form[]
}
let formsInitialState: FormState = {
    items: []    
}
export function formReducer(state: FormState, $action: FormActions) {
    switch ($action.type) {
        case FormActionTypes.LOAD_COMPLETE:
            return {
                items: state.items.concat($action.payload)
            };
        default:
            return state;
    }
}