import { Action } from '@ngrx/store';
import { actionType } from '../util';
import { NgoModel } from '../../models/ngo.model';

export class NgosActions {
  static LOAD = actionType('[Ngos] Load');
  static LOADED = actionType('[Ngos] Loaded');
  static ERROR = actionType('[Ngos] Load Error');
  static DELETE = actionType('[Ngos] Delete');
}

export class LoadNgosAction implements Action {
  readonly type = NgosActions.LOAD;

  payload: {
    key: string,
    refresh: boolean,
  };

  constructor(key: string, refresh = false) {
    this.payload = {
      key,
      refresh,
    };

  }
}

export class LoadNgosErrorAction implements Action {
  readonly type = NgosActions.ERROR;
  payload: {
    key: string
  };

  constructor(key: string) {
    this.payload = {
      key
    };
  }
}

export class DeleteNgoAction implements Action {
  readonly type = NgosActions.DELETE;
  payload: {
    key: string,
    id: string
  };

  constructor(key: string, id: string) {
    this.payload = {
      key,
      id
    };
  }
}

export class LoadNgosCompleteAction implements Action {
  readonly type = NgosActions.LOADED;
  payload: {
    key: string,
    items: NgoModel[]
  };

  constructor(key: string, items: NgoModel[]) {
    this.payload = {
      key,
      items,
    };
  }
}


export type NgosActionTypes = LoadNgosAction
  | LoadNgosCompleteAction
  | LoadNgosErrorAction;
