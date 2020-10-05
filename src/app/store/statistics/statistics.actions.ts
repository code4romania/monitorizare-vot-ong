import { LabelValueModel } from '../../models/labelValue.model';
import { Action } from '@ngrx/store';
import { actionType } from '../util';
export class  StatisticsActions {
    static  LOAD =  actionType('[Stat] Load');
    static  LOADED =  actionType('[Stat] Loaded');
    static  ERROR =  actionType('[Stat] LoadedError');
}

export class LoadStatisticAction implements Action {
    readonly type = StatisticsActions.LOAD;

    payload: {
        key: string,
        page: number,
        pageSize: number
        refresh: boolean
    };

    constructor(key: string, page: number, pageSize: number, refresh = false) {
        this.payload = {
            key,
            page,
            pageSize,
            refresh
        };

    }
}
export class LoadStatisticsErrorAction implements Action {
    readonly type = StatisticsActions.ERROR;
    payload: {
        key: string
    };
    constructor(key: string){
        this.payload = {
            key
        };
    }
}
export class LoadStatisticsCompleteAction implements Action {
    readonly type = StatisticsActions.LOADED;
    payload: {
        key: string
        totalItems: number
        totalPages: number

        items: LabelValueModel[]
    };

    constructor(key: string, items: LabelValueModel[], totalPages: number, totalItems: number) {
        this.payload = {
            key,
            items,
            totalPages,
            totalItems
        };
    }
}
export type StatisticsActionTypes = LoadStatisticAction | LoadStatisticsCompleteAction | LoadStatisticsErrorAction;
