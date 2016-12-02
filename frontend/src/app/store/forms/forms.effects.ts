import { resolve } from 'path';
import { FORMS_LOAD, FORMS_LOADED } from './forms.actions';
import { ApiService } from '../../core/apiService/api.service';

import { Form } from '../../models/form.model';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FormsEffects {
    // private formIds = ["A", "B", "C"];
    private formIds = ["A", "B"];

    constructor(private http: ApiService, private actions: Actions) {

        this.fetchForms = this.fetchForms.bind(this);

    }
    @Effect() forms = this.actions
        .ofType(FORMS_LOAD)
        .switchMap(() => this.fetchForms())
        .map(forms => {
            return {
                type: FORMS_LOADED,
                payload: _.zipObject(this.formIds, forms)
            }
        });
    private fetchForms(): Observable<Form[]> {
        let requests = this.formIds.map(id => {
            return this.http.get('/api/v1/formulare', { body: { idFormular: id } })
                .map(res => requestToForm(id, res.json()))
        });


        return Observable.combineLatest<Form>(requests);

        function requestToForm(id, json) {
            let form = new Form();
            form.idFormular = id;
            form.sectiuni = json.data;
            return form;
        }
    }

}