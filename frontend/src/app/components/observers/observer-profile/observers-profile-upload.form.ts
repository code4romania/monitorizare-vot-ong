import {FormGroup} from '@angular/forms';

export class ObserverProfileUploadForm extends FormGroup {
  constructor() {
    super({
      csv: null
    });
  }
}

