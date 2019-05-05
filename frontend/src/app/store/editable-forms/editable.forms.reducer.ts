import {EditableForm} from '../../models/editable.forms.model';
import {EditableFormsActions, EditableFormsActionTypes} from './editable.forms.actions';
import {Form} from '../../models/form.model';

export class EditableFormsState {
  forms: EditableForm[];
  edited: Form;
}
const initialState: EditableFormsState = {
  forms: [],
  edited: undefined
};
export function editableFormsReducer(state = initialState, $action: EditableFormsActions){
  switch ($action.type) {
    case EditableFormsActionTypes.LOAD_ALL_COMPLETE:
      return {
        ...state,
        forms: $action.payload
      };
    case EditableFormsActionTypes.LOAD_BY_ID_COMPLETE:
      return {
        ...state,
        edited: $action.payload
      };
    default:
      return state;
  }
}
