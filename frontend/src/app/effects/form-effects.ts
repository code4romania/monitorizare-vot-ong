import { ApiService } from '../core/apiService/api.service';
import { Form } from '../models/form.model';
import { FORMS_LOAD, FORMS_LOADED } from '../reducers/forms.reducer';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FormEffects {
    private formIds = ["A", "B", "C"];

    constructor(private http: ApiService, private action$: Actions) {

        this.fetchForms = this.fetchForms.bind(this);

    }
    @Effect() forms = this.action$
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
                .map(res => <Form>res.json())
        });

        return Observable.combineLatest<Form>(requests);
    }

}