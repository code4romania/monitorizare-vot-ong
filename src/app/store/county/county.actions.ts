
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
}

export type CountryActions =
  CountryAnswersFetchAction |
  CountryAnswersErrorAction |
  CountryAnswersSuccessAction |
  CountryPollingStationFetchAction |
  CountryPollingStationErrorAction |
  CountryPollingStationSuccessAction;


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
