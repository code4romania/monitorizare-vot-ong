import {actionType} from '../util';
import {Form} from '../../models/form.model';
import {Action, createAction} from '@ngrx/store';
import {FormDetails} from '../../models/form.info.model';

export class FormActionTypes {
    static readonly LOAD_ALL_FORMS_META = actionType('[Form] LOAD_ALL_FORMS_META');
    static readonly LOAD_ONE_FORM_FULLY = actionType('[Form] LOAD_ONE_FORM_FULLY');
    static readonly LOAD_ONE_FORM_FULLY_COMPLETE = actionType('[Form] LOAD_ONE_FORM_FULLY_COMPLETE');
    static readonly LOAD_ALL_FORMS_META_COMPLETE = actionType('[Form] LOAD_ALL_FORMS_META_COMPLETE');
    static readonly ERROR = actionType('form/error');
    static readonly CLEAR = actionType('form/clear all');
    static readonly UPLOAD = actionType('[Form] UPLOAD');
    static readonly UPLOAD_PUBLISH = actionType('[Form] UPLOAD PUBLISH');
    static readonly UPLOAD_COMPLETE = actionType('[Form] UPLOAD_COMPLETE');
    static readonly UPDATE = actionType('[Form] UPDATE');
    static readonly DELETE = actionType('[Form] DELETE');
}
export class FormLoadAction implements Action {
    readonly type = FormActionTypes.LOAD_ALL_FORMS_META;

    constructor(public draft?: boolean, public forceReload: boolean = false) {
    }
}
export class FormErrorAction implements Action {
    readonly type = FormActionTypes.ERROR;
}
export class FormLoadCompletedAction implements Action {
    readonly type = FormActionTypes.LOAD_ALL_FORMS_META_COMPLETE;
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

export class FormUpdateAction implements Action {
  readonly type = FormActionTypes.UPDATE;

  constructor(public form: Form) {}
}

export class FormDeleteAction implements Action {
  readonly type = FormActionTypes.DELETE;

  constructor(public form: Form) {}
}

export class FullyLoadFormAction implements Action {
  readonly type = FormActionTypes.LOAD_ONE_FORM_FULLY;

  constructor(public formId: number) {}
}

export class FullyLoadFormCompleteAction implements Action {
  readonly type = FormActionTypes.LOAD_ONE_FORM_FULLY_COMPLETE;

  constructor(public payload: Form) {}
}

export type FormActions =
  FormLoadAction |
  FormLoadCompletedAction |
  FormClearAll |
  FullyLoadFormAction |
  FullyLoadFormCompleteAction |
  FormUploadAction ;

export const fetchAllFormTabs = createAction(
  '[Answer-details Page] Fetch All Form Tabs'
);
