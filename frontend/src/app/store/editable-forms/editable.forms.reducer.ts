import {EditableForm} from '../../models/editable.forms.model';
import {EditableFormsActions, EditableFormsActionTypes} from './editable.forms.actions';

export class EditableFormsState {
  forms: EditableForm[];
}
const initialState: EditableFormsState = {
  forms: []
};
export function editableFormsReducer(state = initialState, $action: EditableFormsActions){
  switch ($action.type) {
    case EditableFormsActionTypes.LOAD_ALL_COMPLETE:
      return {
        forms: [...state.forms, ...$action.payload]
      };
    default:
      return state;
  }
}
