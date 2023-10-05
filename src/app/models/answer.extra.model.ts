import { isString, isDate } from 'lodash';

export interface AnswerExtraConstructorData {
  lastModified: string;
  observerArrivalTime: string;
  observerLeaveTime: string;
  numberOfVotersOnTheList: number;
  numberOfCommissionMembers: number;
  numberOfFemaleMembers: number;
  minPresentMembers: number;
  chairmanPresence: boolean;
  singlePollingStationOrCommission: boolean;
  adequatePollingStationSize: boolean;
}
export class AnswerExtra {
  lastModified: Date;
  observerArrivalTime: Date;
  observerLeaveTime: Date;

  numberOfVotersOnTheList: number;
  numberOfCommissionMembers: number;
  numberOfFemaleMembers: number;
  minPresentMembers: number;
  chairmanPresence: boolean;
  singlePollingStationOrCommission: boolean;
  adequatePollingStationSize: boolean;

  constructor(formInfo?: AnswerExtraConstructorData) {
    if (!formInfo) {
      return;
    }

    checkForPropValue(
      formInfo.lastModified,
      (val) => (this.lastModified = val)
    );
    checkForPropValue(
      formInfo.observerArrivalTime,
      (val) => (this.observerArrivalTime = val)
    );
    checkForPropValue(
      formInfo.observerLeaveTime,
      (val) => (this.observerLeaveTime = val)
    );
    this.numberOfVotersOnTheList = formInfo.numberOfVotersOnTheList;
    this.numberOfCommissionMembers = formInfo.numberOfCommissionMembers;
    this.numberOfFemaleMembers = formInfo.numberOfFemaleMembers;
    this.minPresentMembers = formInfo.minPresentMembers;
    this.chairmanPresence = formInfo.chairmanPresence;
    this.singlePollingStationOrCommission =
      formInfo.singlePollingStationOrCommission;
    this.adequatePollingStationSize = formInfo.adequatePollingStationSize;

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
