import {EditableForm} from '../../models/editable.form.model';
import {EditableFormsActions, EditableFormsActionTypes} from './editable.forms.actions';
import {decode, encode, replaceAt} from '../../shared/functions';
import {EditableFormSection} from '../../models/editable.form.section.model';
import {EditableFormQuestionOption} from '../../models/editable.form.question.option.model';
import {EditableFormQuestion} from '../../models/editable.form.question.model';
import {QuestionType} from '../../models/editable.form.question.type';

export class EditableFormsState {
  forms: EditableForm[];
  options: EditableFormQuestionOption[];
  savingForm: EditableForm;
}

const initialState: EditableFormsState = {
  forms: [],
  options: [],
  savingForm: undefined
};

export function editableFormsReducer(state = initialState, $action: EditableFormsActions) {
  switch ($action.type) {
    case EditableFormsActionTypes.LOAD_ALL_COMPLETE:
      return loadAllComplete(state, $action.payload);
    case EditableFormsActionTypes.LOAD_BY_ID_COMPLETE:
      return loadedFormSectionComplete(state, $action.payload);
    case EditableFormsActionTypes.CREATE_FORM_SET_COMPLETE:
      return createdFormSet(state, $action);
    case EditableFormsActionTypes.ADD_FORM_TO_SET:
      return addNewFormSection(state, $action.payload);
    case EditableFormsActionTypes.DELETE_FORM_FROM_SET:
      return deleteFormSection(state, $action.payload);
    case EditableFormsActionTypes.CREATE_FORM_SET:
      return createNewForm(state);
    case EditableFormsActionTypes.ADD_QUESTION_TO_FORM:
      return addNewQuestionToFormSection(state, $action.payload);
    case EditableFormsActionTypes.DELETE_QUESTION_FROM_FORM:
      return deleteQuestionFromSection(state, $action.payload);
    //  options
    case EditableFormsActionTypes.LOAD_ALL_OPTIONS_COMPLETE:
      return loadAllOptionsComplete(state, $action.payload);
    case EditableFormsActionTypes.LOAD_OPTIONS_BY_ID_COMPLETE:
      return loadOptionByIdComplete(state, $action.payload);
    //  save hack
    case EditableFormsActionTypes.SAVE_FORM_SET:
      return startSavingForm(state, $action.payload);
    case EditableFormsActionTypes.SAVE_FORM_SET_COMPLETE:
      return finishSavingForm(state);
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


const createNewForm = (state) => {
  let newForm: EditableForm = new EditableForm(findNextId(state.forms), findNextCode(state.forms), [], 'This is new form');
  return {
    ...state,
    forms: [
      ...state.forms,
      newForm
    ]
  }
};

const addNewFormSection = (state, formSet: EditableForm) => {
  let existingFormIndex: number = state.forms.findIndex(f => f.id === formSet.id);
  let updatedFormSections: EditableFormSection[] = [
    ...formSet.sections,
    new EditableFormSection(findNextId(formSet.sections), formSet.code, findNextUniqueId(formSet.sections), 'This is a new section')
  ];
  let updatedFormSet: EditableForm = new EditableForm(formSet.id, formSet.code, updatedFormSections,
    formSet.description, formSet.version, formSet.published);
  return {
    ...state,
    forms: replaceAt(state.forms, existingFormIndex, updatedFormSet)
  }
};

const deleteFormSection = (state, {formSet, formId}) => {
  let existingFormIndex: number = state.forms.findIndex(f => f.id === formSet.id);
  let existingForm: EditableForm = state.forms[existingFormIndex];
  let updatedForm: EditableForm = new EditableForm(existingForm.id, existingForm.code, existingForm.sections.filter(s => s.id !== formId),
    existingForm.description, existingForm.version, existingForm.published);
  return {
    ...state,
    forms: replaceAt(state.forms, existingFormIndex, updatedForm)
  };
};

const addNewQuestionToFormSection = (state, {formSet, formId}) => {
  let existingFormIndex: number = state.forms.findIndex(f => f.id === formSet.id);
  let existingFormSet: EditableForm = state.forms[existingFormIndex];
  let existingFormSectionIndex: number = existingFormSet.sections.findIndex(s => s.id === formId);
  let existingFormSection: EditableFormSection = existingFormSet.sections[existingFormSectionIndex];
  let updateFormSection: EditableFormSection = new EditableFormSection(existingFormSection.id, existingFormSection.code, existingFormSection.uniqueId,
    existingFormSection.description, [
      ...existingFormSection.questions,
      new EditableFormQuestion(findNextId(existingFormSection.questions), formId, existingFormSet.code, 'This is new question', QuestionType.SINGLE_CHOICE.id)
    ]);
  let updatedFormSet: EditableForm = new EditableForm(formSet.id, formSet.code,
    replaceAt(existingFormSet.sections, existingFormSectionIndex, updateFormSection),
    formSet.description, formSet.version, formSet.published);
  return {
    ...state,
    forms: replaceAt(state.forms, existingFormIndex, updatedFormSet)
  };
};

const deleteQuestionFromSection = (state, {formSet, formId, questionId}) => {
  let existingFormIndex: number = state.forms.findIndex(f => f.id === formSet.id);
  let existingFormSet: EditableForm = state.forms[existingFormIndex];
  let existingFormSectionIndex: number = existingFormSet.sections.findIndex(s => s.id === formId);
  let existingFormSection: EditableFormSection = existingFormSet.sections[existingFormSectionIndex];
  let updateFormSection: EditableFormSection = new EditableFormSection(existingFormSection.id, existingFormSection.code, existingFormSection.uniqueId,
    existingFormSection.description, existingFormSection.questions.filter(q => q.id !== questionId));
  let updatedFormSet: EditableForm = new EditableForm(formSet.id, formSet.code,
    replaceAt(existingFormSet.sections, existingFormSectionIndex, updateFormSection),
    formSet.description, formSet.version, formSet.published);
  return {
    ...state,
    forms: replaceAt(state.forms, existingFormIndex, updatedFormSet)
  };
};

const startSavingForm = (state, formSet: EditableForm) => {
  return {
    ...state,
    savingForm: formSet
  }
};

const finishSavingForm = (state) => {
  return {
    ...state,
    savingForm: undefined
  }
};

const loadAllOptionsComplete = (state, options: EditableFormQuestionOption[]) => {
  return {
    ...state,
    options
  };
};

const loadOptionByIdComplete = (state, option: EditableFormQuestionOption) => {
  let savingFormIndex: number = state.forms.findIndex(f => f.id === state.savingForm.id);
  let updatedSavingForm: EditableForm = state.savingForm;
  state.savingForm.sections.forEach((section: EditableFormSection, sectionIndex: number) => {
    section.questions.forEach((question: EditableFormQuestion, questionIndex: number) => {
      let optionIndex:number = question.options.findIndex(o => o.text === option.text);
      if (optionIndex >= 0){
        let updatedQuestion: EditableFormQuestion = new EditableFormQuestion(question.id, question.formId, question.code, question.text,
          question.typeId, replaceAt(question.options, optionIndex, option));
        let updatedSection: EditableFormSection = new EditableFormSection(section.id, section.code, section.uniqueId, section.description,
          replaceAt(section.questions, questionIndex, updatedQuestion));
        updatedSavingForm = new EditableForm(state.savingForm.id, state.savingForm.code, replaceAt(state.savingForm.sections, sectionIndex, updatedSection),
          state.savingForm.description, state.savingForm.version, state.savingForm.published);
      }
    })
  });
  return {
    ...state,
    forms: replaceAt(state.forms, savingFormIndex, updatedSavingForm),
    options: [
      ...state.options,
      option
    ],
    savingForm: updatedSavingForm
  };
};

const findNextId = (items) => ( items.map(i => i.id).reduce((max, val) => Math.max(max, val), 0) + 1 );
const findNextCode = (items) => ( encode(items
  .map(f => f.code)
  .map(code => decode(code))
  .filter(x => !isNaN(x))
  .reduce((max, val) => Math.max(max, val), 0) + 1));
const findNextUniqueId = (items) => (encode(items
    .map(f => f.uniqueId)
    .map(code => decode(code))
    .filter(x => !isNaN(x))
    .reduce((max, val) => Math.max(max, val), 0) + 1));
