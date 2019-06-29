import {EditableForm} from '../../models/editable.form.model';
import {EditableFormsActions, EditableFormsActionTypes} from './editable.forms.actions';
import {EditableFormSection} from '../../models/editable.form.section.model';
import {replaceAt} from '../../shared/functions';

export class EditableFormsState {
  forms: EditableForm[];
  selectedFormSection: EditableFormSection;
}
const initialState: EditableFormsState = {
  forms: [],
  selectedFormSection: undefined,
};
export function editableFormsReducer(state = initialState, $action: EditableFormsActions){
  switch ($action.type) {
    case EditableFormsActionTypes.LOAD_ALL_COMPLETE:
      return loadAllComplete(state, $action.payload);
    case EditableFormsActionTypes.LOAD_BY_ID_COMPLETE:
      return loadedFormSetComplete(state, $action.payload);
    case EditableFormsActionTypes.CREATE_FORM_SET_COMPLETE:
      return createdFormSet(state, $action);
    case EditableFormsActionTypes.UPDATE_FORM_SET_COMPLETE:
      return loadedFormSetComplete(state, $action.payload);
    default:
      return state;
  }
}

const loadAllComplete = (state: EditableFormsState, formSets: EditableForm[]) => {
  const existingFormSetIds = state.forms.map(f => f.id);
  const newFormSets = formSets.filter(f => !existingFormSetIds.find(id => id === f.id));
  return {
    ...state,
    forms: [
      ...state.forms,
      ...newFormSets
    ]
  }
};

const loadedFormSetComplete = (state, payload: EditableForm) => {
  const existingIndex = state.forms.findIndex(form => form.id === payload.id) || 0;
  return {
    ...state,
    forms: replaceAt(state.forms, existingIndex, payload)
  };
};

const createdFormSet = (state, $action) => {
  return {
    ...state,
    forms: [$action.payload, ...state.forms]
  }
};
