import {FormActions, FormActionTypes} from './form.actions';
import {Form} from '../../models/form.model';
import {FormDetails} from '../../models/form.info.model';
import {cloneDeep} from 'lodash';

export class FormState {
    items: FormDetails[];
    fullyLoaded: {
      [key: number]: Form;
    };
}
const formsInitialState: FormState = {
    items: undefined,
    fullyLoaded: {}
};
export function formReducer(state = formsInitialState, $action: FormActions) {
    switch ($action.type) {
        case FormActionTypes.LOAD_ALL_FORMS_META_COMPLETE:
            return {
                ...state,
                items: $action.payload
            };
        case FormActionTypes.CLEAR:
            return {
                fullyLoaded: [],
                items: []
            };
      case FormActionTypes.LOAD_ONE_FORM_FULLY_COMPLETE:
            const fullyLoaded = state.fullyLoaded;
            const loadedForm = $action.payload;
            const formDetails = state.items.find(f => f.id === loadedForm.id);

            const mutableLoadedForm: Form = cloneDeep(loadedForm);
            mutableLoadedForm.inheritMetaData(formDetails);

            const allFullyLoadedForms = {...fullyLoaded};
            allFullyLoadedForms[mutableLoadedForm.id] = mutableLoadedForm;
            return {
              ...state,
              fullyLoaded: allFullyLoadedForms
            };
        default:
            return state;
    }
}
