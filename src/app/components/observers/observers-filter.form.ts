import { FormGroup, FormControl } from '@angular/forms';

export class ObserversFilterForm extends FormGroup {
    constructor() {
        super({
            name: new FormControl(''),
            phone: new FormControl('')
        });
    }

    isEmpty(){
      return !Object.keys(this.controls).some(e => this.get(e).value.length);
    }
}

