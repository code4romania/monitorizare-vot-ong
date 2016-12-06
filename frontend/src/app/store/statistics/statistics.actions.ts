import { LabelValueModel } from '../../models/labelValue.model';
import { Action } from '@ngrx/store';
import { actionType } from '../util';
export const StatisticsActions = {
    LOAD: actionType('[Stat] Load'),
    LOADED: actionType('[Stat] Loaded'),
    ERROR: actionType('[Stat] LoadedError')
}

export class LoadStatisticAction implements Action {
    type = StatisticsActions.LOAD

    payload: {
        key: string,
        page: number,
        pageSize: number
        refresh: boolean
    }

    constructor(key: string, page: number, pageSize: number, refresh = false) {
        this.payload = {
            key,
            page,
            pageSize,
            refresh
        }

    }
}
export class LoadStatisticsCompleteAction implements Action {
    type = StatisticsActions.LOADED
    payload: {
        key: string
        totalItems: number
        totalPages: number

        items: LabelValueModel[]
    }

    constructor(key: string, items: LabelValueModel[], totalPages: number, totalItems: number) {
        this.payload = {
            key,
            items,
            totalPages,
            totalItems
        }
    }
}
export type StatisticsActionTypes = LoadStatisticAction | LoadStatisticsCompleteAction;