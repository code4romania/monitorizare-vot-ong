import { actionType } from '../util';
import { Form } from '../../models/form.model';
import { Action } from '@ngrx/store';
export const FormActionTypes = {
    LOAD: actionType('[Form] LOAD'),
    LOAD_COMPLETE: actionType('[Form] LOAD_COMPLETE')
}
export class FormLoadAction implements Action {
    type = FormActionTypes.LOAD
    payload: string[];

    constructor(formIds: string[]) {
        this.payload = formIds;
    }
}
export class FormLoadCompletedAction implements Action {
    type = FormActionTypes.LOAD_COMPLETE;
    payload: Form[];

    constructor(forms: Form[]) {
        this.payload = forms;
    }
}
export type FormActions = FormLoadAction | FormLoadCompletedAction;