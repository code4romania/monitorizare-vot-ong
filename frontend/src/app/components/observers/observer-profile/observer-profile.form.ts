import { FormGroup, FormControl, Validators } from "@angular/forms";

export class ObserverProfileForm extends FormGroup {
    constructor() {
        super({
            lastName: new FormControl(''),
            firstName: new FormControl(''),
            email: new FormControl('', [Validators.email, Validators.required]),
            phoneNumber: new FormControl('', [Validators.required]),
            country: new FormControl('', Validators.required),
            voteSection: new FormControl('', Validators.required)
        });
    }
}