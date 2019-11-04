import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {
  EditableFormsActionTypes,
  EditableFormsLoadAllCompleteAction,
  EditableFormsLoadAllOptionsCompleteAction,
  EditableFormsLoadByIdAction,
  EditableFormsLoadByIdCompleteAction,
  EditableFormsLoadOptionByIdCompleteAction,
  EditableFormsSaveFormSectionAction,
  EditableFormsSaveFormSectionCompleteAction
} from './editable.forms.actions';
import {EditableFormsService} from '../../services/editable.forms.service';
import {EditableForm} from '../../models/editable.form.model';
import {EditableFormSection} from '../../models/editable.form.section.model';
import {EditableFormQuestionOption} from '../../models/editable.form.question.option.model';
import {EditableFormQuestion} from '../../models/editable.form.question.model';
import {Store} from '@ngrx/store';
import {AppState} from '../store.module';

@Injectable()
export class EditableFormsEffects {
  constructor(private actions: Actions, private store: Store<AppState>, private service: EditableFormsService) {
  }

  @Effect()
  loadEditableFormsAction = this.actions
    .ofType(EditableFormsActionTypes.LOAD_ALL)
    .concatMap(() => this.service.loadAllForms())
    .map((forms: EditableForm[]) => new EditableFormsLoadAllCompleteAction(forms));

  @Effect()
  loadEditableFormsOptionsAction = this.actions
    .ofType(EditableFormsActionTypes.LOAD_ALL_OPTIONS)
    .concatMap(() => this.service.loadAllFormsOptions())
    .map((forms: EditableFormQuestionOption[]) => new EditableFormsLoadAllOptionsCompleteAction(forms));

  @Effect()
  loadEditableFormsByIdAction = this.actions
    .ofType(EditableFormsActionTypes.LOAD_BY_ID)
    .map((action: EditableFormsLoadByIdAction) => action.payload)
    .concatMap(id => this.service.loadFormById(id))
    .map((sections: EditableFormSection[]) => new EditableFormsLoadByIdCompleteAction(sections));

  @Effect()
  saveOptions = this.actions
    .ofType(EditableFormsActionTypes.SAVE_OPTIONS)
    .map((action: EditableFormsSaveFormSectionAction) => action.payload)
    .flatMap((formSet: EditableForm) => formSet.sections)
    .flatMap((section: EditableFormSection) => section.questions)
    .flatMap((question: EditableFormQuestion) => question.options)
    .filter((option: EditableFormQuestionOption) => option.id < 0)
    .concatMap((option: EditableFormQuestionOption) => this.service.saveOption(option))
    .map((savedOption: EditableFormQuestionOption) => new EditableFormsLoadOptionByIdCompleteAction(savedOption));

  @Effect()
  saveFormSet = this.actions
    .withLatestFrom(this.store.select(s => s.editableForms.savingForm))
    .filter((value: [EditableFormsSaveFormSectionAction, EditableForm]) => {
      let formSet: EditableForm = value[1];
      let notSavedOptions: number = 0;
      (formSet == undefined ? [] : formSet.sections)
        .forEach((section: EditableFormSection) => {
          section.questions.forEach((question: EditableFormQuestion) => {
            question.options.forEach((option: EditableFormQuestionOption) => {
              notSavedOptions += (option.id < 0 ? 1 : 0);
            })
          })
        });
      return formSet != undefined && notSavedOptions === 0;
    })
    .do(([, formSet]) => {console.log(`Trying to save form set: ${formSet.description}`, formSet)} )
    .switchMap(([, formSet]) => this.service.saveFormSet(formSet))
    .switchMap((savedId) => [
      new EditableFormsSaveFormSectionCompleteAction(),
      new EditableFormsLoadByIdAction(savedId)
    ])
}
