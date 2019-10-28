import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {
  EditableFormsActionTypes,
  EditableFormsLoadAllCompleteAction,
  EditableFormsLoadByIdAction,
  EditableFormsLoadByIdCompleteAction
} from './editable.forms.actions';
import {EditableFormsService} from '../../services/editable.forms.service';
import {EditableForm} from '../../models/editable.form.model';
import {EditableFormSection} from '../../models/editable.form.section.model';

@Injectable()
export class EditableFormsEffects {
  constructor(private actions: Actions, private service: EditableFormsService) {
  }

  @Effect()
  loadEditableFormsAction = this.actions
    .ofType(EditableFormsActionTypes.LOAD_ALL)
    .concatMap(() => this.service.loadAllForms())
    .map((forms: EditableForm[]) => new EditableFormsLoadAllCompleteAction(forms));

  @Effect()
  loadEditableFormsByIdAction = this.actions
    .ofType(EditableFormsActionTypes.LOAD_BY_ID)
    .map((action: EditableFormsLoadByIdAction) => action.payload)
    .concatMap(id => this.service.loadFormById(id))
    .map((sections: EditableFormSection[]) => new EditableFormsLoadByIdCompleteAction(sections));

}
