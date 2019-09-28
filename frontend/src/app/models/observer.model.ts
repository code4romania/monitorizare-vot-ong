export class Observer {
  id?: string;
  firstName?: string;
  lastName?: string;
  ngo?: string;
  lastLogin?: Date;
  email: string;
  phoneNumber: string;
  country: string;
  voteSection: string;
  deviceRegisterDate: Date;

  constructor(observerResponse: any) {
    this.id = observerResponse.id;
    this.firstName = observerResponse.firstName;
    this.ngo = observerResponse.ngo;
    this.lastName = observerResponse.lastName;
    this.email = observerResponse.email;
    this.phoneNumber = observerResponse.phoneNumber;
    this.country = observerResponse.country;
    this.voteSection = observerResponse.voteSection;
    this.deviceRegisterDate = new Date(observerResponse.deviceRegisterDate);
    this.lastLogin = new Date(observerResponse.lastLogin);
  }
}

