import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {
  EditableFormsActionTypes,
  EditableFormsCreateCompleteAction,
  EditableFormsLoadAllCompleteAction,
  EditableFormsLoadByIdAction,
  EditableFormsLoadByIdCompleteAction,
  EditableFormsUpdateFormSetCompleteAction
} from './editable.forms.actions';
import {EditableFormsService} from '../../services/editable.forms.service';

@Injectable()
export class EditableFormsEffects {
  constructor(private actions: Actions, private service: EditableFormsService) {
  }

  @Effect()
  loadEditableFormsAction = this.actions
    .ofType(EditableFormsActionTypes.LOAD_ALL)
    .concatMap(() => this.service.loadAllForms())
    .map(forms => new EditableFormsLoadAllCompleteAction(forms));

  @Effect()
  loadEditableFormsByIdAction = this.actions
    .ofType(EditableFormsActionTypes.LOAD_BY_ID)
    .map((action: EditableFormsLoadByIdAction) => action.payload)
    .concatMap(id => this.service.loadFormById(id))
    .map(form => new EditableFormsLoadByIdCompleteAction(form));

  @Effect()
  createEditableFormSetAction = this.actions
    .ofType(EditableFormsActionTypes.CREATE_FORM_SET)
    .map(() => this.service.createFormSet())
    .concatMap(res => res)
    .map(res => this.service.deserialize(res.json()))
    .map(form => new EditableFormsCreateCompleteAction(form));

  @Effect()
  addFormToSetAction = this.actions
    .ofType(EditableFormsActionTypes.ADD_FORM_TO_SET)
    .map(action => this.service.addFormToSetSet(action.payload))
    .concatMap(res => res)
    .map(res => this.service.deserialize(res.json()))
    .map(form => new EditableFormsUpdateFormSetCompleteAction(form));


  @Effect()
  deleteFormFromSet = this.actions
    .ofType(EditableFormsActionTypes.DELETE_FORM_FROM_SET)
    .map(action => this.service.deleteFormFromSet(action.payload.formSet, action.payload.formId))
    .concatMap(res => res)
    .map(res => this.service.deserialize(res.json()))
    .map(form => new EditableFormsUpdateFormSetCompleteAction(form));

  @Effect()
  addQuestionToForm = this.actions
    .ofType(EditableFormsActionTypes.ADD_QUESTION_TO_FORM)
    .map(action => this.service.addQuestionToForm(action.payload.formSet, action.payload.formId))
    .concatMap(res => res)
    .map(res => this.service.deserialize(res.json()))
    .map(form => new EditableFormsUpdateFormSetCompleteAction(form));

  @Effect()
  deleteQuestionFromForm = this.actions
    .ofType(EditableFormsActionTypes.DELETE_QUESTION_FROM_FORM)
    .map(action => this.service.deleteQuestionFromForm(action.payload.formSet, action.payload.formId, action.payload.questionId))
    .concatMap(res => res)
    .map(res => this.service.deserialize(res.json()))
    .map(form => new EditableFormsUpdateFormSetCompleteAction(form));
}
