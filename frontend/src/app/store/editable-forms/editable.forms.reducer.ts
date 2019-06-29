import {EditableForm} from '../../models/editable.form.model';
import {EditableFormsActions, EditableFormsActionTypes} from './editable.forms.actions';
import {EditableFormSection} from '../../models/editable.form.section.model';
import {EditableFormQuestion} from '../../models/editable.form.question.model';

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
      if (state.forms.length === 0){
        return {
          ...state,
          forms: $action.payload
        };
      }else{
        return state;
      }
    case EditableFormsActionTypes.LOAD_BY_ID_COMPLETE:
      return loadedFormSetComplete(state, $action.payload);
    case EditableFormsActionTypes.CREATED_FORM_SET:
      return createdFormSet(state, $action);
    case EditableFormsActionTypes.UPDATE_FORM_SET_COMPLETE:
      return loadedFormSetComplete(state, $action.payload);
    case EditableFormsActionTypes.ADD_FORM_TO_SET:
      return addFormToSet(state, $action);
    case EditableFormsActionTypes.DELETE_FORM:
      return deleteForm(state, $action);
    case EditableFormsActionTypes.ADD_FORM_QUESTION:
      return addQuestionToForm(state, $action);
    case EditableFormsActionTypes.DELETE_FORM_QUESTION:
      return deleteQuestionToForm(state, $action);
    default:
      return state;
  }
}

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

const addFormToSet = (state, $action) => {
  const editedIndex = state.forms.findIndex(e => e.id === $action.payload.id);
  const editedForm = state.forms[editedIndex];
  const nextForm = new EditableForm(
    editedForm.id,
    editedForm.sections.concat(new EditableFormSection(
      nextQuestionId(state),
      nextFormSectionId(editedForm),
      'This is newly created'
    )),
    editedForm.description,
    editedForm.version,
    editedForm.published
  );
  return {
    ...state,
    selectedFormSet: nextForm,
    forms: replaceAt(state.forms, editedIndex, nextForm)
  };
};

const deleteForm = (state, $action) => {
  let newSections = state.selectedFormSet.sections.filter(s => s.id !== $action.payload);
  let newFormSet = new EditableForm(state.selectedFormSet.id, newSections, state.selectedFormSet.description, state.selectedFormSet.version, state.selectedFormSet.published);
  let deleteIndex = state.forms.findIndex(f => f.id === state.selectedFormSet.id);
  return {
    ...state,
    forms: replaceAt(state.forms, deleteIndex, newFormSet),
    selectedFormSet: newFormSet,
    selectedFormSection: undefined
  };
};

const addQuestionToForm = (state, $action) => {
  const updatedSectionIndex = state.selectedFormSet.sections.findIndex(f => f.id === $action.payload);
  const updatedSection = state.selectedFormSet.sections[updatedSectionIndex];
  const newSection = new EditableFormSection(updatedSection.id, updatedSection.description, updatedSection.questions.concat(
    new EditableFormQuestion(nextQuestionId(updatedSection), state.selectedFormSet.id, 3, 'X', 2, [])
  ));
  const newSections = [
      ...state.selectedFormSet.sections.slice(0, updatedSectionIndex),
    newSection,
    ...state.selectedFormSet.sections.slice(updatedSectionIndex + 1)
  ];
  const updatedFormSetIndex = state.forms.findIndex(f => f.id === state.selectedFormSet.id);
  const newFormSet = new EditableForm(state.selectedFormSet.id, newSections, state.selectedFormSet.description, state.selectedFormSet.version, state.selectedFormSet.published);
  return {
    ...state,
    forms: replaceAt(state.forms, updatedFormSetIndex, newFormSet),
    selectedFormSet: newFormSet,
    selectedFormSection: newSection
  };
};

const deleteQuestionToForm = (state, $action) => {
  const updatedSectionIndex = state.selectedFormSet.sections.findIndex(f => f.id === $action.payload.sectionId);
  const updatedSection = state.selectedFormSet.sections[updatedSectionIndex];
  const newSection = new EditableFormSection(updatedSection.id, updatedSection.description,
    updatedSection.questions.filter(q => q.id !== $action.payload.questionId));
  const newSections = [
      ...state.selectedFormSet.sections.slice(0, updatedSectionIndex),
    newSection,
    ...state.selectedFormSet.sections.slice(updatedSectionIndex + 1)
  ];
  const updatedFormSetIndex = state.forms.findIndex(f => f.id === state.selectedFormSet.id);
  const newFormSet = new EditableForm(state.selectedFormSet.id, newSections, state.selectedFormSet.description, state.selectedFormSet.version, state.selectedFormSet.published);
  return {
    ...state,
    forms: replaceAt(state.forms, updatedFormSetIndex, newFormSet),
    selectedFormSet: newFormSet,
    selectedFormSection: newSection
  };
};

/*
decoded: numeric e.g 0,1,2, ...
encoded: <letter><digit>

decode: digit * 26 + (letter - 'A')
encode: <(numeric % 26) + 'A'><numeric / 26>

 */
const decode = (encoded) => parseInt(encoded.charAt(1)) * 26 + encoded.charCodeAt(0) - 'A'.charCodeAt(0);
const encode = (numeric) => String.fromCharCode(numeric % 26 + 'A'.charCodeAt(0)) + Math.floor(numeric / 26);
const nextFormSectionId = (state) => {
  const maxNumericId = state.sections.length === 0
    ? 0
    : state.sections
      .map(section => section.id)
      .map(id => id.length === 1 ? id + '0' : id)
      .map(id => decode(id))
      .sort((left, right) => right - left)[0];
  let newId = encode(maxNumericId + 1);
  return newId.charAt(1) === '0' ? newId.charAt(0) : newId;
};
const nextQuestionId = (state) => (
  state.questions.length === 0
    ? 1
    : 1 + state.questions
      .map(q => q.id)
      .sort((left, right) => right - left)[0]
);
const replaceAt = (array, index, item) => (
  [
    ...array.slice(0, index),
    item,
    ...array.slice(index + 1)
  ]
);
