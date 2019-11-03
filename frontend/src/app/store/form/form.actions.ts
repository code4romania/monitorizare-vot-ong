import { actionType } from '../util'
import { Form } from '../../models/form.model'
import { Action } from '@ngrx/store'
export class FormActionTypes{
    static readonly LOAD = actionType('[Form] LOAD')
    static  readonly LOAD_COMPLETE = actionType('[Form] LOAD_COMPLETE')
    static  readonly ERROR = actionType('form/error')
    static  readonly CLEAR = actionType('form/clear all')
}
export class FormLoadAction implements Action {
    readonly type = FormActionTypes.LOAD

    constructor() {
    }
}
export class FormErrorAction implements Action {
    readonly type = FormActionTypes.ERROR
}
export class FormLoadCompletedAction implements Action {
    readonly type = FormActionTypes.LOAD_COMPLETE
    payload: Form[]

    constructor(forms: Form[]) {
        this.payload = forms
    }
}
export class FormClearAll implements Action {
    readonly type = FormActionTypes.CLEAR
}
export type FormActions = FormLoadAction | FormLoadCompletedAction | FormClearAll