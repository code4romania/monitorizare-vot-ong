import {Form} from '../../models/form.model';
import {Observable} from 'rxjs/Rx';
import {FormActionTypes, FormErrorAction, FormLoadAction, FormLoadCompletedAction} from './form.actions';
import {Actions, Effect} from '@ngrx/effects';
import {ApiService} from '../../core/apiService/api.service';
import {Injectable} from '@angular/core';
import {FormSection} from '../../models/form.section.model';

@Injectable()
export class FormEffects {
    constructor(private http: ApiService, private actions: Actions) { }

    @Effect()
    loadFormAction = this.actions
        .ofType(FormActionTypes.LOAD)
        .map((action: FormLoadAction) => action.payload)
        .switchMap(ids => Observable.from(ids))
        .concatMap(id => this.getForm(id))
        .map(form => new FormLoadCompletedAction([form]))
        .catch(() =>  Observable.of(new FormErrorAction()));

    private getForm(id: string): Observable<Form> {
        return this.http.get<FormSection[]>('/api/v1/formulare', { body: { idFormular: id } })
            .map(sections => {
                return <Form>{
                    idFormular: id,
                    sectiuni: sections
                }
            })
    }
}
