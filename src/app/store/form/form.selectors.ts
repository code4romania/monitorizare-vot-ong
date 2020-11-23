import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FormState } from './form.reducer'

export const form = createFeatureSelector<FormState>('form');

export const getFormItems = createSelector(
  form,
  (state: FormState) => state.items ? state.items : [],
);

export const getFullyLoadedForms = createSelector(
  form,
  (state: FormState) => state.fullyLoaded
);