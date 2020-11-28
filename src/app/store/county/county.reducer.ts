import { CountyState } from "./county.state";
import { createReducer, on } from "@ngrx/store";
import { fetchCountriesFailure, fetchCountriesSuccess } from "./county.actions";

const initialCountyState: CountyState = {
  counties: undefined,
};

export const countyReducer = createReducer(
  initialCountyState,
  on(fetchCountriesSuccess, (state, action) => ({ ...state, counties: action.counties, })),
  on(fetchCountriesFailure, (state, action) => ({ ...state, errorMessage: action.errorMessage, })),
);