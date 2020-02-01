
import {of as observableOf,  Observable } from 'rxjs';

import {catchError, concatMap, map, switchMap} from 'rxjs/operators';
import { Form } from '../../models/form.model';
import { FormActionTypes, FormErrorAction, FormLoadAction, FormLoadCompletedAction } from './form.actions';
import {Actions, Effect, ofType} from '@ngrx/effects';
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
        .pipe(ofType(FormActionTypes.LOAD)).pipe(
        switchMap(_ => this.getAvailableForms()),
        switchMap(r => r.formVersions),
        map(f => {
         return { id: f.id, description: f.description};
        }),
        concatMap((x: { id: number, description: string }) => this.getForm(x.id, x.description)),
        map(form => new FormLoadCompletedAction([form])),
        catchError(() => observableOf(new FormErrorAction())), );

    private getForm(id: number, description: string): Observable<Form> {
        const formsUrl: string = Location.joinWithSlash(this.baseUrl, `/api/v1/form/${id}`);

        return this.http.get<FormSection[]>(formsUrl).pipe(
            map(sections => {
                const form = new Form();
                form.idFormular = id;
                form.sections = sections;
                form.description = description;
                return form;
            }));
    }
    private getAvailableForms(): Observable<FormInfo> {
        const formsUrl: string = Location.joinWithSlash(this.baseUrl, '/api/v1/form/');

        return this.http.get<FormInfo>(formsUrl);
    }

}
