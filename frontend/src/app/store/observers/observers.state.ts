import { observersConfig, ObserversStateConfig } from './observers.config';

import { LabelValueModel } from '../../models/labelValue.model';
import * as _ from 'lodash';

export class ObserversStateItem {
    key: string
    method: string

    header: string
    subHeader: string

    page: number
    pageSize: number
    totalPages: number
    totalItems: number

    loading = false
    error = false
    values = <LabelValueModel[]>[]

    constructor(config?: ObserversStateConfig) {
        if (config) {
            this.key = config.key
            this.method = config.method
            this.header = config.header
            this.subHeader = config.subHeader
        }
    }
}
export class ObserversState {
    [key: string]: ObserversStateItem
}
export let observersInitialState: ObserversState = _.keyBy<ObserversStateItem>(observersConfig.map<ObserversStateItem>((config) => new ObserversStateItem(config)),value => value.key);
