import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgoModel } from '../../../models/ngo.model';

export class NgoProfileForm extends FormGroup {
  constructor() {
    super({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl(''),
      sendSMS: new FormControl(false),
    });
  }

  isFieldValid(fieldName: NgoProfileField): boolean {
    const field = this.get(fieldName);
    return field.valid && field.dirty;
  }
}

export type NgoProfileField = keyof NgoModel;
