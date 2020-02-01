import {observersConfig, ObserversStateConfig} from './observers.config';

import {LabelValueModel} from '../../models/labelValue.model';
import * as _ from 'lodash';
import {Observer} from '../../models/observer.model';

export class ObserversStateItem {
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
  values = [] as Observer[];

  constructor(config?: ObserversStateConfig) {
    if (config) {
      this.key = config.key;
      this.method = config.method;
      this.header = config.header;
      this.subHeader = config.subHeader;
    }
  }
}

export class ObserversState {
  [key: string]: ObserversStateItem
}

export class ObserversCountState{
  count: number;
}
export let observersInitialState: ObserversState = _.keyBy<ObserversStateItem>(observersConfig.map<ObserversStateItem>((config) => new ObserversStateItem(config)), value => value.key);
export let observersCountInitialState: ObserversCountState = { count: 0 };
