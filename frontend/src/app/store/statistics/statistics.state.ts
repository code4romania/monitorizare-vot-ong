import { statisticsConfig, StatisticsStateConfig } from './statistics.config';

import { LabelValueModel } from '../../models/labelValue.model';
import {keyBy} from 'lodash';

export class StatisticsStateItem {
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
    values = [] as LabelValueModel[];

    constructor(config?: StatisticsStateConfig) {
        if (config) {
            this.key = config.key;
            this.method = config.method;
            this.header = config.header;
            this.subHeader = config.subHeader;
        }
    }
}
export class StatisticsState {
    [key: string]: StatisticsStateItem
}
export let statisticsInitialState: StatisticsState = keyBy<StatisticsStateItem>(
  statisticsConfig.map<StatisticsStateItem>((config) => new StatisticsStateItem(config)), value => value.key);
