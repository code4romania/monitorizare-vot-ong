import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observer } from "app/models/observer.model";

export class ObserverProfileForm extends FormGroup {
    constructor() {
        super({
            lastName: new FormControl(''),
            firstName: new FormControl(''),
            email: new FormControl('', [Validators.email, Validators.required]),
            phoneNumber: new FormControl('', [Validators.required]),
            county: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    isFieldValid(fieldName: ObserverProfileField): boolean {
        const field = this.get(fieldName);
        return field.valid && field.dirty;
    }
}

export type ObserverProfileField = keyof Observer;
