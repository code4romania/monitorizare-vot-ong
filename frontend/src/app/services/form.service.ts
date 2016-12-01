import { ApiService } from '../core/apiService/api.service';
import { Form } from '../models/form.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class FormsService {

    private _formsObservable: Observable<Form[]>;
    private formIds = ["A", "B", "C"];

    constructor(private http: ApiService) {

    }

    fetchForms() {

        if (this._formsObservable) {
            return this._formsObservable;
        }

        let formObs = this.formIds
            .map(id =>
                this.http.get('/api/v1/formulare', { body: { idFormular: id } })
                    .map(res => res.json())
            )
        this._formsObservable = Observable.combineLatest(formObs)
            .publishReplay(1)
            .refCount()
        return this._formsObservable;
    }
}