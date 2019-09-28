import {LabelValueModel} from '../../models/labelValue.model';
import {Action} from '@ngrx/store';
import {actionType} from '../util';

export class ObserversActions {
  static LOAD = actionType('[Observers] Load');
  static LOADED = actionType('[Observers] Loaded');
  static ERROR = actionType('[Observers] Load Error');
}

export class LoadObserversAction implements Action {
  readonly type = ObserversActions.LOAD;

  payload: {
    key: string,
    page: number,
    pageSize: number
    refresh: boolean
  };

  constructor(key: string, page: number, pageSize: number, refresh = false) {
    this.payload = {
      key,
      page,
      pageSize,
      refresh
    }

  }
}

export class LoadObserversErrorAction implements Action {
  readonly type = ObserversActions.ERROR;
  payload: {
    key: string
  };

  constructor(key: string) {
    console.log("ERROR ACTION", key);
    this.payload = {
      key
    }
  }
}

export class LoadObserversCompleteAction implements Action {
  readonly type = ObserversActions.LOADED;
  payload: {
    key: string
    totalItems: number
    totalPages: number

    items: Observer[]
  };

  constructor(key: string, items: Observer[], totalPages: number, totalItems: number) {
    console.log('LOADED OBSERVERS');
    this.payload = {
      key,
      items,
      totalPages,
      totalItems
    }
  }
}

export type ObserversActionTypes = LoadObserversAction | LoadObserversCompleteAction | LoadObserversErrorAction;
