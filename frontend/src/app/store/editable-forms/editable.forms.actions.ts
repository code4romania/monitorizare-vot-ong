import {actionType} from '../util';
import {Action} from '@ngrx/store';
import {EditableForm} from '../../models/editable.forms.model';
import {Form} from '../../models/form.model';

export class EditableFormsActionTypes{
  static readonly LOAD_ALL = actionType('[Editable Forms] LOAD ALL');
  static readonly LOAD_ALL_COMPLETE = actionType('[Editable Forms] LOAD ALL COMPLETE');
  static readonly LOAD_BY_ID = actionType('[Editable Form] LOAD BY ID');
  static readonly LOAD_BY_ID_COMPLETE = actionType('[Editable Form] LOAD BY ID COMPLETE');
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
  constructor(public payload: Form){}
}
export type EditableFormsActions = EditableFormsLoadAllAction
  | EditableFormsLoadAllCompleteAction
  | EditableFormsLoadByIdAction
  | EditableFormsLoadByIdCompleteAction;
