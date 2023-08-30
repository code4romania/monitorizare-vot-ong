
import { CountyState } from "./county.state";
import { CountyActions, CountyActionTypes } from "./county.actions";


const initialCountyState: CountyState = {
  counties: undefined,
};

export function countyReducer(state = initialCountyState, $action: CountyActions) {
  switch ($action.type) {
    case CountyActionTypes.FETCH_COUNTIES_SUCCESS:
      return { ...state, counties: $action.counties };
    case CountyActionTypes.FETCH_COUNTIES_FAILURE:
      return { ...state, errorMessage: $action.errorMessage };
    case CountyActionTypes.FETCH_COUNTIES_FOR_POLLING_STATIONS_SUCCESS:
      return { ...state, counties: $action.counties };
    case CountyActionTypes.FETCH_COUNTIES_FOR_POLLING_STATIONS_FAILURE:
      return { ...state, errorMessage: $action.errorMessage };

  }
}
