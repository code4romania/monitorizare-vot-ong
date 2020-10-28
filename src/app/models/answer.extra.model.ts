import {isString, isDate} from 'lodash';

export interface AnswerExtraConstructorData {
    lastModified: string;
    urbanArea: boolean;
    observerArrivalTime: string;
    observerLeaveTime: string;
    isPollingStationPresidentFemale: boolean;
}
export class AnswerExtra {
    lastModified: Date;
    urbanArea = false;
    observerArrivalTime: Date;
    observerLeaveTime: Date;
    isPollingStationPresidentFemale = false;

    constructor(formInfo?: AnswerExtraConstructorData) {
        if (!formInfo) {
            return;
        }
        checkForPropValue(formInfo.lastModified, val => this.lastModified = val);
        checkForPropValue(formInfo.observerArrivalTime, val => this.observerArrivalTime = val);
        checkForPropValue(formInfo.observerLeaveTime, val => this.observerLeaveTime = val);
        this.urbanArea = formInfo.urbanArea;
        this.isPollingStationPresidentFemale = formInfo.isPollingStationPresidentFemale;

        function checkForPropValue(value, setPropertyFn: (val: Date) => void) {
            if (!value) {
                return;
            }
            if (isString(value)) {
                value = new Date(value);
            }

            if (isDate(value)) {
                setPropertyFn(value);
            }
        }

    }
}
