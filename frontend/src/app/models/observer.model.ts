export class Observer {
  id?: string;
  firstName?: string;
  lastName?: string;
  ngo?: string;
  lastLogin?: Date;
  email: string;
  phoneNumber: string;
  county: string;
  password: string;
  deviceRegisterDate: Date;
  isSelected: boolean = false;

  constructor(observerResponse: any) {
    this.id = observerResponse.id;
    this.firstName = observerResponse.firstName;
    this.ngo = observerResponse.ngo;
    this.lastName = observerResponse.lastName;
    this.email = observerResponse.email;
    this.phoneNumber = observerResponse.phone;
    this.county = observerResponse.county;
    this.password = observerResponse.password;
    this.deviceRegisterDate = new Date(observerResponse.deviceRegisterDate);
    this.lastLogin = new Date(observerResponse.lastLogin);
  }
}

