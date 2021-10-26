
import { CountyState } from "./county.state";
import { CountryActions, CountryActionTypes } from "./county.actions";


const initialCountyState: CountyState = {
  counties: undefined,
};

export function countyReducer(state = initialCountyState, $action: CountryActions) {
  switch ($action.type) {
    case CountryActionTypes.FETCH_COUNTRIES_SUCCESS:
    case CountryActionTypes.FETCH_COUNTRIES_FOR_POLLING_STATIONS_SUCCESS:
    case CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_DROP_AND_DROP_ORDER_SUCCESS:
    case CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_MOVE_TO_FIRST_SUCCESS:
    case CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_DELETE_SUCCESS:
      return { ...state, counties: $action.countries };
    case CountryActionTypes.FETCH_COUNTRIES_FAILURE:
    case CountryActionTypes.FETCH_COUNTRIES_FOR_POLLING_STATIONS_FAILURE:
    case CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_DROP_AND_DROP_ORDER_FAILURE:
    case CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_MOVE_TO_FIRST_FAILURE:
    case CountryActionTypes.POST_COUNTRIES_FOR_POLLING_STATIONS_DELETE_FAILURE:
      return { ...state, errorMessage: $action.errorMessage };

  }
}