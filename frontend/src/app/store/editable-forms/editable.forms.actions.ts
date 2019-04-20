import {actionType} from '../util';
import {Action} from '@ngrx/store';
import {EditableForm} from '../../models/editable.forms.model';

export class EditableFormsActionTypes{
  static readonly LOAD_ALL = actionType('[Editable Forms] LOAD ALL');
  static readonly LOAD_ALL_COMPLETE = actionType('[Editable Forms] LOAD ALL COMPLETE');
}
export class EditableFormsLoadAllAction implements Action{
  readonly type = EditableFormsActionTypes.LOAD_ALL;
}
export class EditableFormsLoaddAllCompleteAction implements Action{
  readonly type = EditableFormsActionTypes.LOAD_ALL_COMPLETE;
  constructor(public payload: EditableForm[]){}
}
export type EditableFormsActions = EditableFormsLoadAllAction | EditableFormsLoaddAllCompleteAction;
