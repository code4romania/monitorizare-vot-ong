export class NgoModel {
  id: number;
  name: string;
  shortName: string;
  organizer: boolean;
  isActive: boolean;
  isSelected: boolean;

  constructor(ngo: any) {
    this.id = ngo.id ? ngo.id : '';
    this.name = ngo.name ? ngo.name : '';
    this.shortName = ngo.shortName ? ngo.shortName : '';
    this.organizer = ngo.organizer ? ngo.organizer : false;
    this.isActive = ngo.isActive ? ngo.isActive : false;
    this.isSelected = ngo.isSelected ? ngo.isSelected : false;

  }
}

