import { ngosConfig, NgosStateConfig } from './ngos.config';

import { keyBy } from 'lodash';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NgoModel } from '../../models/ngo.model';

export class NgosStateItem {
  key: string;
  method: string;

  header: string;
  subHeader: string;

  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;

  loading = false;
  error = false;
  values = [] as NgoModel[];

  constructor(config?: NgosStateConfig) {
    if (config) {
      this.key = config.key;
      this.method = config.method;
      this.header = config.header;
      this.subHeader = config.subHeader;
    }
  }
}

export class NgosState {
  [key: string]: NgosStateItem;
}

export let ngosInitialState: NgosState = keyBy<NgosStateItem>(
  ngosConfig.map<NgosStateItem>(
    (config) => new NgosStateItem(config)
  ),
  (value) => value.key
);

export const getNgosState = createFeatureSelector<NgosState>('ngos');

export const getNgoList = createSelector(
  getNgosState,
  ((state) => state['ngos-list'])
);

export const getNgosListValues = createSelector(
  getNgoList,
  ((state) => state.values)
);

export const getSelectedNgos = createSelector(
  getNgosListValues,
  (state: NgoModel[], ngoId: number) => state.find(v => v.id === ngoId)
);