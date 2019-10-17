import { Form } from '../../models/form.model';
import { Observable } from 'rxjs/Rx';
import { FormActionTypes, FormErrorAction, FormLoadAction, FormLoadCompletedAction } from './form.actions';
import { Actions, Effect } from '@ngrx/effects';
import { ApiService } from '../../core/apiService/api.service';
import { Injectable } from '@angular/core';
import { FormSection } from '../../models/form.section.model';
import { Location } from '@angular/common';
import { environment } from 'environments/environment';

@Injectable()
export class FormEffects {
    private baseUrl: string;

    constructor(private http: ApiService, private actions: Actions) {
        this.baseUrl = environment.apiUrl;
    }

    @Effect()
    loadFormAction = this.actions
        .ofType(FormActionTypes.LOAD)
        .map((action: FormLoadAction) => action.payload)
        .switchMap(ids => Observable.from(ids))
        .concatMap(id => this.getForm(id))
        .map(form => new FormLoadCompletedAction([form]))
        .catch(() => Observable.of(new FormErrorAction()));

    private getForm(id: string): Observable<Form> {
        const formsUrl: string = Location.joinWithSlash(this.baseUrl, `/api/v1/form/${id}`);

        return this.http.get<FormSection[]>(formsUrl)
            .map(sections => {
                const form = new Form();
                form.idFormular = id;
                form.sections = sections;
                return form;
            })
    }
}
