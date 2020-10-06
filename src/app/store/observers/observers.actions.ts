import { Action } from '@ngrx/store';
import { actionType } from '../util';
import { Observer } from '../../models/observer.model';

export class ObserversActions {
  static LOAD = actionType('[Observers] Load');
  static LOADOBSERVERSTOTALCOUNT = actionType('[Observers] Load Total Count');
  static LOADEDOBSERVERSTOTALCOUNT = actionType('[Observers] Loaded Total Count');
  static LOADED = actionType('[Observers] Loaded');
  static ERROR = actionType('[Observers] Load Error');
  static DELETE = actionType('[Observers] Delete observer');
}

export class LoadObserversCountAction implements Action {
  readonly type = ObserversActions.LOADOBSERVERSTOTALCOUNT;
}

export class LoadObserversAction implements Action {
  readonly type = ObserversActions.LOAD;

  payload: {
    key: string,
    page: number,
    pageSize: number,
    refresh: boolean,
    searchParamName?: string
    searchParamPhone?: string
  };

  constructor(key: string, page: number, pageSize: number, refresh = false, searchParamName: string = '', searchParamPhone: string = '') {
    this.payload = {
      key,
      page,
      pageSize,
      refresh,
      searchParamName,
      searchParamPhone
    };

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
    };
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
    };
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
    };
  }
}

export class LoadObserversCountCompleteAction implements Action {
  readonly type = ObserversActions.LOADEDOBSERVERSTOTALCOUNT;
  payload: {
    count: number;
  };

  constructor(count: number) {
    this.payload = { count };
  }

}

export type ObserversActionTypes = LoadObserversAction | LoadObserversCompleteAction | LoadObserversErrorAction | LoadObserversCountAction | LoadObserversCountCompleteAction;
