import {LabelValueModel} from '../../models/labelValue.model';
import {Action} from '@ngrx/store';
import {actionType} from '../util';
import {Observer} from '../../models/observer.model';

export class ObserversActions {
  static LOAD = actionType('[Observers] Load');
  static LOADED = actionType('[Observers] Loaded');
  static ERROR = actionType('[Observers] Load Error');
  static DELETE = actionType('[Observers] Delete observer');
}

export class LoadObserversAction implements Action {
  readonly type = ObserversActions.LOAD;

  payload: {
    key: string,
    page: number,
    pageSize: number,
    refresh: boolean,
    searchParamName?: string
    searchParamCounty?: string
  };

  constructor(key: string, page: number, pageSize: number, refresh = false, searchParamName: string = '', searchParamCounty: string = '') {
    this.payload = {
      key,
      page,
      pageSize,
      refresh,
      searchParamName,
      searchParamCounty
    }

  }
}

export class LoadObserversErrorAction implements Action {
  readonly type = ObserversActions.ERROR;
  payload: {
    key: string
  };

  constructor(key: string) {
    this.payload = {
      key
    }
  }
}

export class DeleteObserverAction implements Action {
  readonly type = ObserversActions.DELETE;
  payload: {
    key: string,
    id: string
  };

  constructor(key: string, id: string) {
    this.payload = {
      key,
      id
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
    this.payload = {
      key,
      items,
      totalPages,
      totalItems
    }
  }
}

export type ObserversActionTypes = LoadObserversAction | LoadObserversCompleteAction | LoadObserversErrorAction;
