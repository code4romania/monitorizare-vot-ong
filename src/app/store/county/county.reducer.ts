
import { CountyState } from "./county.state";
import { CountryActions, CountryActionTypes } from "./county.actions";


const initialCountyState: CountyState = {
  counties: undefined,
};

export function countyReducer(state = initialCountyState, $action: CountryActions) {
  switch ($action.type) {
    case CountryActionTypes.FETCH_COUNTRIES_SUCCESS:
      return { ...state, counties: $action.countries };
    case CountryActionTypes.FETCH_COUNTRIES_FAILURE:
      return { ...state, errorMessage: $action.errorMessage };
    case CountryActionTypes.FETCH_COUNTRIES_FOR_POLLING_STATIONS_SUCCESS:
      return { ...state, counties: $action.countries };
    case CountryActionTypes.FETCH_COUNTRIES_FOR_POLLING_STATIONS_FAILURE:
      return { ...state, errorMessage: $action.errorMessage };

  }
}