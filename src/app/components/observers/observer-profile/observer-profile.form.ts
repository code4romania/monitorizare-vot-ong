import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observer } from '../../../models/observer.model';

export class ObserverProfileForm extends FormGroup {
  constructor() {
    super({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl(''),
      sendSMS: new FormControl(false),
    });
  }

  isFieldValid(fieldName: ObserverProfileField): boolean {
    const field = this.get(fieldName);
    return field.valid && field.dirty;
  }
}

export type ObserverProfileField = keyof Observer;
