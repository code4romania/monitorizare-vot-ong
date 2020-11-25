import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FormState } from './form.reducer'

export const form = createFeatureSelector<FormState>('form');

export const getFormItems = createSelector(
  form,
  (state: FormState) => state.items ? state.items : [],
);

export const getFormItemsById = createSelector(
  getFormItems,
  formItems => formItems.reduce((acc, f) => (acc[f.id] = f, acc), {})
);

export const getFullyLoadedForms = createSelector(
  form,
  (state: FormState) => state.fullyLoaded
);

export const getAllQuestionsGroupedByTabId = createSelector(
  getFullyLoadedForms,
  loadedForms => Object.keys(loadedForms).reduce(
    (tabs, crtTabId) => {
      const tabValue = loadedForms[+crtTabId];

      return {
        ...tabs,
        [crtTabId]: tabValue.formSections.flatMap(formSection => formSection.questions).reduce((acc, q) => (acc[q.id] = q, acc), {}),
      };
    },
    {}
  )
)