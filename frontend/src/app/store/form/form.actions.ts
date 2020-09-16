import {actionType} from '../util';
import {Form} from '../../models/form.model';
import {Action} from '@ngrx/store';
import {FormDetails} from '../../models/form.info.model';

export class FormActionTypes {
    static readonly LOAD = actionType('[Form] LOAD');
    static readonly FULLY_LOAD = actionType('[Form] FULLY_LOAD');
    static readonly FULLY_LOAD_COMPLETE = actionType('[Form] FULLY_LOAD_COMPLETE');
    static readonly LOAD_COMPLETE = actionType('[Form] LOAD_COMPLETE');
    static readonly ERROR = actionType('form/error');
    static readonly CLEAR = actionType('form/clear all');
    static readonly UPLOAD = actionType('[Form] UPLOAD');
    static readonly UPLOAD_PUBLISH = actionType('[Form] UPLOAD PUBLISH');
    static readonly UPLOAD_COMPLETE = actionType('[Form] UPLOAD_COMPLETE');
    static readonly DELETE = actionType('[Form] DELETE');
}
export class FormLoadAction implements Action {
    readonly type = FormActionTypes.LOAD;

    constructor() {
    }
}
export class FormErrorAction implements Action {
    readonly type = FormActionTypes.ERROR;
}
export class FormLoadCompletedAction implements Action {
    readonly type = FormActionTypes.LOAD_COMPLETE;
    payload: FormDetails[];

    constructor(forms: FormDetails[]) {
        this.payload = forms;
    }
}
export class FormClearAll implements Action {
    readonly type = FormActionTypes.CLEAR;
}

export class FormUploadAction implements Action {
  readonly type = FormActionTypes.UPLOAD;

  constructor(public form: Form) {}
}

export class FormUploadPublishAction implements Action {
  readonly type = FormActionTypes.UPLOAD_PUBLISH;

  constructor(public form: Form) {}
}

export class FormUploadCompleteAction implements Action {
  readonly type = FormActionTypes.UPLOAD_COMPLETE;
}

export class FormDeleteAction implements Action {
  readonly type = FormActionTypes.DELETE;

  constructor(public formId: number) {}
}

export class FullyLoadFormAction implements Action {
  readonly type = FormActionTypes.FULLY_LOAD;

  constructor(public formId: number) {}
}

export class FullyLoadFormCompleteAction implements Action {
  readonly type = FormActionTypes.FULLY_LOAD_COMPLETE;

  constructor(public payload: Form) {}
}

export type FormActions =
  FormLoadAction |
  FormLoadCompletedAction |
  FormClearAll |
  FullyLoadFormAction |
  FullyLoadFormCompleteAction |
  FormUploadAction ;
