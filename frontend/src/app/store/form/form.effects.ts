import { Form } from '../../models/form.model';
import { Observable } from 'rxjs/Rx';
import { FormActionTypes, FormErrorAction, FormLoadAction, FormLoadCompletedAction } from './form.actions';
import { Actions, Effect } from '@ngrx/effects';
import { ApiService } from '../../core/apiService/api.service';
import { Injectable } from '@angular/core';
import { FormSection } from '../../models/form.section.model';
import { Location } from '@angular/common';
import { environment } from 'environments/environment';
import { FormInfo } from 'app/models/form.info.model';

@Injectable()
export class FormEffects {
    private baseUrl: string;

    constructor(private http: ApiService, private actions: Actions) {
        this.baseUrl = environment.apiUrl;
    }

    @Effect()
    loadFormAction = this.actions
        .ofType(FormActionTypes.LOAD)
        .switchMap(_ => this.getAvailableForms())
        .switchMap(r=>r.formVersions)
        .map(f=>{
         return { id:f.id,description: f.description};
        })
        .concatMap((x: { id: number, description: string }) => this.getForm(x.id, x.description))
        .map(form => new FormLoadCompletedAction([form]))
        .catch(() => Observable.of(new FormErrorAction()));

    private getForm(id: number,description: string): Observable<Form> {
        const formsUrl: string = Location.joinWithSlash(this.baseUrl, `/api/v1/form/${id}`);

        return this.http.get<FormSection[]>(formsUrl)
            .map(sections => {
                const form = new Form();
                form.idFormular = id;
                form.sections = sections;
                form.description = description;
                return form;
            })
    }
    private getAvailableForms(): Observable<FormInfo> {
        const formsUrl: string = Location.joinWithSlash(this.baseUrl, '/api/v1/form/');

        return this.http.get<FormInfo>(formsUrl);
    }

}
