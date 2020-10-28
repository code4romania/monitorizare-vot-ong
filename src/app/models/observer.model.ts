export class Observer {
  id: string;
  name: string;
  ngo: string;
  phone: string;
  pin = '';
  sendSMS = false;
  isSelected: boolean;
  deviceRegisterDate: string;
  lastSeen: string;
  numberOfNotes: number;
  numberOfPollingStations: number;


  constructor(observerResponse: any) {
    this.id = observerResponse.id ? observerResponse.id : '';
    this.name = observerResponse.name ? observerResponse.name : '';
    this.ngo = observerResponse.ngo ? observerResponse.ngo : '';
    this.phone = observerResponse.phone ? observerResponse.phone : '';
    this.sendSMS = observerResponse.sendSMS ? observerResponse.sendSMS : false;
    this.isSelected = observerResponse.isSelected ? observerResponse.isSelected : false;
    this.deviceRegisterDate = observerResponse.deviceRegisterDate ? observerResponse.deviceRegisterDate : null;
    this.numberOfNotes = observerResponse.numberOfNotes ? observerResponse.numberOfNotes : 0;
    this.numberOfPollingStations = observerResponse.numberOfPollingStations ? observerResponse.numberOfPollingStations : 0;
  }
}

