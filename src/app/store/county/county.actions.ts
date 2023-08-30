
import { Action } from "@ngrx/store";
import { actionType } from "../util";
import { County } from "./county.state";


export class CountyActionTypes {
  static readonly FETCH_COUNTIES_FROM_ANSWERS = actionType('[Answers Page] Fetch Counties');
  static readonly FETCH_COUNTIES_SUCCESS = actionType('[County Effects] Counties Fetched Success');
  static readonly FETCH_COUNTIES_FAILURE = actionType('[County Effects] Counties Fetched Failure');
  static readonly FETCH_COUNTIES_FOR_POLLING_STATIONS = actionType('[Polling Station Page] Fetch Counties');
  static readonly FETCH_COUNTIES_FOR_POLLING_STATIONS_SUCCESS = actionType('[Polling Station Effects] Counties Fetched Success');
  static readonly FETCH_COUNTIES_FOR_POLLING_STATIONS_FAILURE = actionType('[Polling Station Effects] Counties Fetched Failure');
}

export type CountyActions =
  CountyAnswersFetchAction |
  CountyAnswersErrorAction |
  CountyAnswersSuccessAction |
  CountyPollingStationFetchAction |
  CountyPollingStationErrorAction |
  CountyPollingStationSuccessAction;


export class CountyAnswersFetchAction implements Action {
  readonly type = CountyActionTypes.FETCH_COUNTIES_FROM_ANSWERS;
}

export class CountyAnswersErrorAction implements Action {
  readonly type = CountyActionTypes.FETCH_COUNTIES_FAILURE;
  errorMessage: string;

  constructor(errorMessage: string) {
    this.errorMessage = errorMessage;
  }
}

export class CountyAnswersSuccessAction implements Action {
  readonly type = CountyActionTypes.FETCH_COUNTIES_SUCCESS;
  counties: County[];

  constructor(counties: County[]) {
    this.counties = counties;
  }
}


export class CountyPollingStationFetchAction implements Action {
  readonly type = CountyActionTypes.FETCH_COUNTIES_FOR_POLLING_STATIONS;

  constructor() { }
}

export class CountyPollingStationErrorAction implements Action {
  readonly type = CountyActionTypes.FETCH_COUNTIES_FOR_POLLING_STATIONS_FAILURE;
  errorMessage: string;

  constructor(errorMessage: string) {
    this.errorMessage = errorMessage;
  }
}

export class CountyPollingStationSuccessAction implements Action {
  readonly type = CountyActionTypes.FETCH_COUNTIES_FOR_POLLING_STATIONS_SUCCESS;
  counties: County[];

  constructor(counties: County[]) {
    this.counties = counties;
  }
}
