import {Injectable} from '@angular/core';
import {ApiService} from '../../core/apiService/api.service';
import {Observable} from 'rxjs';
import {EditableForm} from '../../models/editable.forms.model';
import {Actions, Effect} from '@ngrx/effects';
import {
  EditableFormsActionTypes,
  EditableFormsLoadAllCompleteAction,
  EditableFormsLoadByIdAction,
  EditableFormsLoadByIdCompleteAction
} from './editable.forms.actions';
import {Form} from '../../models/form.model';

@Injectable()
export class EditableFormsEffects {
  constructor(private http: ApiService, private actions: Actions){}

  @Effect()
  loadEditableFormsAction = this.actions
    .ofType(EditableFormsActionTypes.LOAD_ALL)
    .concatMap(() => this.loadAllForms())
    .map(forms => new EditableFormsLoadAllCompleteAction(forms));

  @Effect()
  loadEditableFormsByIdAction = this.actions
    .ofType(EditableFormsActionTypes.LOAD_BY_ID)
    .map( (action: EditableFormsLoadByIdAction) => action.payload)
    .concatMap( id => this.loadFormById(id))
    .map(form => new EditableFormsLoadByIdCompleteAction(form));

  private loadAllForms(): Observable<EditableForm[]>{
    return this.http.get('/mock/api/editable-forms')
      .map(res => res.json())
      .map( json => {
        return json.forms.map(f => {
          return <EditableForm>{
            id: f.id,
            description: f.description,
            version: f.version,
            published: f.published
          };
        })
      })
  }

  private loadFormById(id: string) {
    return this.http.get(`/mock/api/editable-forms/${id}`)
      .map(res => res.json())
      .map(json => {
        return <Form>{
          idFormular: id,
          sectiuni: json
        }
      })
  }
}
