import {Injectable} from '@angular/core';
import {ApiService} from '../../core/apiService/api.service';
import {Observable} from 'rxjs';
import {EditableForm} from '../../models/editable.forms.model';
import {Actions, Effect} from '@ngrx/effects';
import {EditableFormsActionTypes, EditableFormsLoaddAllCompleteAction} from './editable.forms.actions';

@Injectable()
export class EditableFormsEffects {
  constructor(private http: ApiService, private actions: Actions){}

  @Effect()
  loadEditableFormsAction = this.actions
    .ofType(EditableFormsActionTypes.LOAD_ALL)
    .concatMap(() => this.loadAllForms())
    .map(forms => new EditableFormsLoaddAllCompleteAction(forms));

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
}
