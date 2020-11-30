import { FormGroup, FormControl } from '@angular/forms';

export class NgoFilterForm extends FormGroup {
    constructor() {
        super({
            name: new FormControl('')
        });
    }

    isEmpty() {
        return !Object.keys(this.controls).some(e => this.get(e).value.length);
    }
}

