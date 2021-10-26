
import { Action } from "@ngrx/store";
import { actionType } from "../util";
import { County } from "./county.state";


export class CountryActionTypes {
  static readonly FETCH_COUNTRIES_FROM_ANSWERS = actionType('[Answers Page] Fetch Counties');
  static readonly FETCH_COUNTRIES_SUCCESS = actionType('[County Effects] Counties Fetched Success');
  static readonly FETCH_COUNTRIES_FAILURE = actionType('[County Effects] Counties Fetched Failure');
  static readonly FETCH_COUNTRIES_FOR_POLLING_STATIONS = actionType('[Polling Station Page] Fetch Counties');
  static readonly FETCH_COUNTRIES_FOR_POLLING_STATIONS_SUCCESS = actionType('[Polling Station Effects] Counties Fetched Success');
  static readonly FETCH_COUNTRIES_FOR_POLLING_STATIONS_FAILURE = actionType('[Polling Station Effects] Counties Fetched Failure');
  static readonly POST_COUNTRIES_FOR_POLLING_STATIONS_DROP_AND_DROP_ORDER = actionType('[Polling Station Page] Drag and Dropped Post');
  static readonly POST_COUNTRIES_FOR_POLLING_STATIONS_DROP_AND_DROP_ORDER_SUCCESS = actionType('[Polling Station Page] Drag and Dropped Success');
  static readonly POST_COUNTRIES_FOR_POLLING_STATIONS_DROP_AND_DROP_ORDER_FAILURE = actionType('[Polling Station Page] Drag and Dropped Failure');
  static readonly POST_COUNTRIES_FOR_POLLING_STATIONS_MOVE_TO_FIRST = actionType('[Polling Station Page] Move to First Post');
  static readonly POST_COUNTRIES_FOR_POLLING_STATIONS_MOVE_TO_FIRST_SUCCESS = actionType('[Polling Station Page] Move to First Success');
  static readonly POST_COUNTRIES_FOR_POLLING_STATIONS_MOVE_TO_FIRST_FAILURE = actionType('[Polling Station Page] Move to First Failure');
  static readonly POST_COUNTRIES_FOR_POLLING_STATIONS_DELETE = actionType('[Polling Station Page] DELETE Post');
  static readonly POST_COUNTRIES_FOR_POLLING_STATIONS_DELETE_SUCCESS = actionType('[Polling Station Page] DELETE Success');
  static readonly POST_COUNTRIES_FOR_POLLING_STATIONS_DELETE_FAILURE = actionType('[Polling Station Page] DELETE Failure');
}

export type CountryActions =
  CountryAnswersFetchAction |
  CountryAnswersErrorAction |
  CountryAnswersSuccessAction |
  CountryPollingStationFetchAction |
  CountryPollingStationErrorAction |
  CountryPollingStationSuccessAction |
  CountryPollingDragAndDropAction |
  CountryPollingDragAndDropErrorAction |
  CountryPollingDragAndDropSuccessAction |
  CountryPollingMoveToFirstAction |
  CountryPollingMoveToFirstErrorAction |
  CountryPollingMoveToFirstSuccessAction |
  CountryPollingDeleteAction |
  CountryPollingDeleteErrorAction |
  CountryPollingDeleteSuccessAction;


export class CountryAnswersFetchAction implements Action {
  readonly type = CountryActionTypes.FETCH_COUNTRIES_FROM_ANSWERS;
}

export class CountryAnswersErrorAction implements Action {
  readonly type = CountryActionTypes.FETCH_COUNTRIES_FAILURE;
  errorMessage: string;

  constructor(errorMessage: string) {
    this.errorMessage = errorMessage;
  }
}

export class CountryAnswersSuccessAction implements Action {
  readonly type = CountryActionTypes.FETCH_COUNTRIES_SUCCESS;
  countries: County[];

  constructor(countries: County[]) {
    this.countries = countries;
  }

}


export class CountryPollingStationFetchAction implements Action {
  readonly type = CountryActionTypes.FETCH_COUNTRIES_FOR_POLLING_STATIONS;

  constructor() { }
}

export class CountryPollingStationErrorAction implements Action {
  readonly type = CountryActionTypes.FETCH_COUNTRIES_FOR_POLLING_STATIONS_FAILURE;
  errorMessage: string;

  constructor(errorMessage: string) {
    this.errorMessage = errorMessage;
  }
}

export class CountryPollingStationSuccessAction implements Action {
  readonly type = CountryActionTypes.FETCH_COUNTRIES_FOR_POLLING_STATIONS_SUCCESS;
  countries: County[];

  constructor(countries: County[]) {
    this.countries = countries;
  }
}


export class CountryPollingDragAndDropAction implements Action {
  readonly type = CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_DROP_AND_DROP_ORDER;
  countries: County[];

  constructor(countries: County[]) {
    this.countries = countries;
  }
}

export class CountryPollingDragAndDropErrorAction implements Action {
  readonly type = CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_DROP_AND_DROP_ORDER_FAILURE;
  errorMessage: string;

  constructor(errorMessage: string) {
    this.errorMessage = errorMessage;
  }
}

export class CountryPollingDragAndDropSuccessAction implements Action {
  readonly type = CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_DROP_AND_DROP_ORDER_SUCCESS;
  countries: County[];

  constructor(countries: County[]) {
    this.countries = countries;
  }
}


export class CountryPollingMoveToFirstAction implements Action {
  readonly type = CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_MOVE_TO_FIRST;
  country: County;

  constructor(country: County) {
    this.country = country;
  }
}

export class CountryPollingMoveToFirstErrorAction implements Action {
  readonly type = CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_MOVE_TO_FIRST_FAILURE;
  errorMessage: string;

  constructor(errorMessage: string) {
    this.errorMessage = errorMessage;
  }
}

export class CountryPollingMoveToFirstSuccessAction implements Action {
  readonly type = CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_MOVE_TO_FIRST_SUCCESS;
  countries: County[];

  constructor(countries: County[]) {
    this.countries = countries;
  }
}

export class CountryPollingDeleteAction implements Action {
  readonly type = CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_DELETE;
  country: County;

  constructor(country: County) {
    this.country = country;
  }
}

export class CountryPollingDeleteErrorAction implements Action {
  readonly type = CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_DELETE_FAILURE;
  errorMessage: string;

  constructor(errorMessage: string) {
    this.errorMessage = errorMessage;
  }
}

export class CountryPollingDeleteSuccessAction implements Action {
  readonly type = CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_DELETE_SUCCESS;
  countries: County[];

  constructor(countries: County[]) {
    this.countries = countries;
  }
}

