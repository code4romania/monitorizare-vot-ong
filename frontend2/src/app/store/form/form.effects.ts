import { Form } from '../../models/form.model';
import { FormActionTypes, FormErrorAction, FormLoadAction, FormLoadCompletedAction } from './form.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApiService } from '../../core/apiService/api.service';
import { Injectable } from '@angular/core';
import { FormSection } from '../../models/form.section.model';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';

@Injectable()
export class FormEffects {
  @Effect()
  loadFormAction = this.actions.pipe(
    ofType(FormActionTypes.LOAD)
    , map((action: FormLoadAction) => action.payload)
    , switchMap((ids: string[]) => from(ids))
    , concatMap((id: string) => this.getForm(id))
    , map((form: Form) => new FormLoadCompletedAction([form]))
    , catchError(() => of(new FormErrorAction())));

  constructor(private http: ApiService, private actions: Actions) {
  }

  private getForm(id: string): Observable<Form> {
    return this.http.get<FormSection[]>('/api/v1/formulare', { body: { idFormular: id } })
               .pipe(
                 map(sections => {
                   return {
                     idFormular: id,
                     sectiuni: sections
                   } as Form;
                 }));
  }
}
