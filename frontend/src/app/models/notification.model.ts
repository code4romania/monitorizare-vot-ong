export class Notification {
  message: string;
  counties: string[];
  observers: string[];
  pollingStations: string[];


  constructor(message: string, counties: string[], observers: string[], pollingStations: string[]) {
    this.message = message;
    this.counties = counties;
    this.observers = observers;
    this.pollingStations = pollingStations;
  }
}
