import {FormActions, FormActionTypes} from './form.actions';
import {Form} from '../../models/form.model';
import {FormDetails} from '../../models/form.info.model';

export class FormState {
    items: FormDetails[];
    fullyLoaded: {
      [key: number]: Form;
    };
}
const formsInitialState: FormState = {
    items: [],
    fullyLoaded: {}
};
export function formReducer(state = formsInitialState, $action: FormActions) {
    switch ($action.type) {
        case FormActionTypes.LOAD_COMPLETE:
            return {
                ...state,
                items: $action.payload
            };
        case FormActionTypes.CLEAR:
            return {
                fullyLoaded: [],
                items: []
            };
        case FormActionTypes.FULLY_LOAD_COMPLETE:
            const fullyLoaded = this.state.fullyLoaded;
            const loadedForm: Form = $action.payload;
            fullyLoaded[loadedForm.id] = loadedForm;
            return {
              ...state,
              fullyLoaded
            };
        default:
            return state;
    }
}
