import { FormActions, FormActionTypes } from './form.actions';
import { Form } from '../../models/form.model';

export class FormState {
  items: Form[];
}

const formsInitialState: FormState = {
  items: []
};

export function formReducer(state = formsInitialState, $action: FormActions) {
  switch ($action.type) {
    case FormActionTypes.LOAD_COMPLETE:
      return {
        items: state.items.concat($action.payload)
      };
    case FormActionTypes.CLEAR:
      return {
        items: []
      };
    default:
      return state;
  }
}
