import {actionType} from '../util';
import {Action} from '@ngrx/store';
import {EditableForm} from '../../models/editable.form.model';

export class EditableFormsActionTypes{
  static readonly LOAD_ALL = actionType('[Editable Forms] LOAD ALL');
  static readonly LOAD_ALL_COMPLETE = actionType('[Editable Forms] LOAD ALL COMPLETE');
  static readonly LOAD_BY_ID = actionType('[Editable Forms] LOAD BY ID');
  static readonly LOAD_BY_ID_COMPLETE = actionType('[Editable Forms] LOAD BY ID COMPLETE');
  static readonly CREATE_FORM_SET = actionType('[Editable Forms] CREATE FORM SET');
  static readonly ADD_FORM_TO_SET = actionType('[Editable Forms] ADD FORM TO SET');
  static readonly DELETE_FORM = actionType('[Editable Forms] DELETE FORM');
  static readonly ADD_FORM_QUESTION = actionType('[Editable Forms] ADD FORM QUESTION');
  static readonly DELETE_FORM_QUESTION = actionType('[Editable Forms] DELETE FORM QUESTION');
  //
  static readonly UPDATE_FORM_SET = actionType('[Editable Forms] UPDATE FORM SET');
  static readonly UPDATE_FORM_SET_COMPLETE = actionType('[Editable Forms] UPDATE FORM SET COMPLETE');
  static readonly CREATED_FORM_SET = actionType('[Editable Forms] CREATED FORM SET');
}
export class EditableFormsLoadAllAction implements Action{
  readonly type = EditableFormsActionTypes.LOAD_ALL;
}
export class EditableFormsLoadAllCompleteAction implements Action{
  readonly type = EditableFormsActionTypes.LOAD_ALL_COMPLETE;
  constructor(public payload: EditableForm[]){}
}
export class EditableFormsLoadByIdAction implements Action{
  readonly type = EditableFormsActionTypes.LOAD_BY_ID;
  constructor(public payload: string){}
}
export class EditableFormsLoadByIdCompleteAction implements Action {
  readonly type = EditableFormsActionTypes.LOAD_BY_ID_COMPLETE;
  constructor(public payload: EditableForm){}
}
export class EditableFormsCreateAction implements Action{
  readonly type = EditableFormsActionTypes.CREATE_FORM_SET;
}
export class EditableFormsAddFormToSetAction implements Action{
  readonly type = EditableFormsActionTypes.ADD_FORM_TO_SET;
  constructor(public payload: EditableForm) {}
}
export class EditableFormsDeleteFormAction implements Action{
  readonly type = EditableFormsActionTypes.DELETE_FORM;
  constructor(public payload: string) {}
}
export class EditableFormsAddFormQuestionAction implements Action{
  readonly type = EditableFormsActionTypes.ADD_FORM_QUESTION;
  constructor(public payload: string) {}
}
export class EditableFormsDeleteFormQuestionAction implements Action{
  readonly type = EditableFormsActionTypes.DELETE_FORM_QUESTION;
  constructor(public payload: {sectionId: string, questionId: number}) {}
}
export class EditableFormsCreatedFormSetAction implements Action{
  readonly type = EditableFormsActionTypes.CREATED_FORM_SET;
  constructor(public payload: EditableForm) {}
}
export class EditableFormsUpdateFormSetAction implements Action{
  readonly type = EditableFormsActionTypes.UPDATE_FORM_SET;
  constructor(public payload: EditableForm) {}
}
export class EditableFormsUpdateFormSetCompleteAction implements Action{
  readonly type = EditableFormsActionTypes.UPDATE_FORM_SET_COMPLETE;
  constructor(public payload: EditableForm) {}
}
export type EditableFormsActions = EditableFormsLoadAllAction
  | EditableFormsLoadAllCompleteAction
  | EditableFormsLoadByIdAction
  | EditableFormsLoadByIdCompleteAction
  | EditableFormsCreateAction
  | EditableFormsAddFormToSetAction
  | EditableFormsDeleteFormAction
  | EditableFormsAddFormQuestionAction
  | EditableFormsDeleteFormQuestionAction
  | EditableFormsCreatedFormSetAction
  | EditableFormsUpdateFormSetAction
  | EditableFormsUpdateFormSetCompleteAction;
