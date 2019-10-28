import {EditableForm} from '../../models/editable.form.model';
import {EditableFormsActions, EditableFormsActionTypes} from './editable.forms.actions';
import {replaceAt} from '../../shared/functions';
import {EditableFormSection} from '../../models/editable.form.section.model';

export class EditableFormsState {
  forms: EditableForm[];
}

const initialState: EditableFormsState = {
  forms: []
};

export function editableFormsReducer(state = initialState, $action: EditableFormsActions) {
  switch ($action.type) {
    case EditableFormsActionTypes.LOAD_ALL_COMPLETE:
      return loadAllComplete(state, $action.payload);
    case EditableFormsActionTypes.LOAD_BY_ID_COMPLETE:
      return loadedFormSectionComplete(state, $action.payload);
    case EditableFormsActionTypes.CREATE_FORM_SET_COMPLETE:
      return createdFormSet(state, $action);
    //
    case EditableFormsActionTypes.CREATE_FORM_SET:
      return createNewForm(state, $action);
    default:
      return state;
  }
}

const loadAllComplete = (state: EditableFormsState, formSets: EditableForm[]) => {
  const existingFormSetIds = state.forms.map(f => f.code);
  const newFormSets = formSets.filter(f => !existingFormSetIds.find(code => code === f.code));
  return {
    ...state,
    forms: [
      ...state.forms,
      ...newFormSets
    ]
  }
};

const loadedFormSectionComplete = (state, sections: EditableFormSection[]) => {
  let formCode: string = sections
    .filter(section => section.code)
    .map(section => section.code)
    .find(() => true);
  if (formCode){
    let editedFormIndex: number = state.forms.findIndex(f => f.code === formCode);
    if (editedFormIndex >= 0){
      let savedSections = sections.filter(s => s.id >= 0);
      let existingForm: EditableForm = state.forms[editedFormIndex];
      let futureForm: EditableForm = new EditableForm(existingForm.id, existingForm.code, savedSections,
        existingForm.description, existingForm.version, existingForm.published);
      console.log(`Replacing existing form(${formCode}) with a new one that has the following sections: `, savedSections);
      return {
        ...state,
        forms: replaceAt(state.forms, editedFormIndex, futureForm)
      }
    }else{
      console.log(`There is no Form with the code: ${formCode}`);
      return state;
    }
  }else{
    console.log(`There is no code defined on the form sections received: `, sections);
    return state;
  }
};

const createdFormSet = (state, $action) => {
  return {
    ...state,
    forms: [$action.payload, ...state.forms]
  }
};


const createNewForm = (state, $action) => {
  return {
    ...state,
    forms: [$action.payload, ...state.forms]
  }
};

