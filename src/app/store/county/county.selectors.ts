import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountyState } from './county.state';

export const county = createFeatureSelector<CountyState>('county');

export const getCounties = createSelector(
  county,
  (state: CountyState) => state.counties,
)