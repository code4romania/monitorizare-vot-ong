import { createAction, props } from "@ngrx/store";
import { County } from "./county.state";

export const fetchCountiesFromAnswers = createAction(
  '[Answers Page] Fetch Counties'
);

export const fetchCountriesSuccess = createAction(
  '[County Effects] Counties Fetched Success',
  props<{ counties: County[] }>()
);

export const fetchCountriesFailure = createAction(
  '[County Effects] Counties Fetched Failure',
  props<{ errorMessage: string }>()
);