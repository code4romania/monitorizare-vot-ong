import {Injectable} from '@angular/core';
import {ApiService} from '../../core/apiService/api.service';
import {Observable} from 'rxjs';
import {EditableForm} from '../../models/editable.form.model';
import {Actions, Effect} from '@ngrx/effects';
import {
  EditableFormsActionTypes, EditableFormsCreatedFormSetAction,
  EditableFormsLoadAllCompleteAction,
  EditableFormsLoadByIdAction,
  EditableFormsLoadByIdCompleteAction, EditableFormsUpdateFormSetCompleteAction
} from './editable.forms.actions';
import {EditableFormSection} from '../../models/editable.form.section.model';
import {EditableFormQuestion} from '../../models/editable.form.question.model';
import {EditableFormQuestionOption} from '../../models/editable.form.question.option.model';

@Injectable()
export class EditableFormsEffects {
  constructor(private http: ApiService, private actions: Actions) {
  }

  @Effect()
  loadEditableFormsAction = this.actions
    .ofType(EditableFormsActionTypes.LOAD_ALL)
    .concatMap(() => this.loadAllForms())
    .map(forms => new EditableFormsLoadAllCompleteAction(forms));

  @Effect()
  loadEditableFormsByIdAction = this.actions
    .ofType(EditableFormsActionTypes.LOAD_BY_ID)
    .map((action: EditableFormsLoadByIdAction) => action.payload)
    .concatMap(id => this.loadFormById(id))
    .map(form => new EditableFormsLoadByIdCompleteAction(form));

  @Effect()
  createEditableFormSetAction = this.actions
    .ofType(EditableFormsActionTypes.CREATE_FORM_SET)
    .map(() => this.http.post('/mock/v1/formulare', {}))
    .concatMap(res => res)
    .map(res => res.json())
    .map(this.mapFormularToForm)
    .map(form => new EditableFormsCreatedFormSetAction(form));

  @Effect()
  updateFormSetAction = this.actions
    .ofType(EditableFormsActionTypes.UPDATE_FORM_SET)
    .map(action => this.http.put('/mock/v1/formulare', this.mapFormSetToFormular(action.payload)))
    .concatMap(res => res)
    .map(res => res.json())
    .map(this.mapFormularToForm)
    .map(form => new EditableFormsUpdateFormSetCompleteAction(form));

  private loadAllForms(): Observable<EditableForm[]> {
    return this.http.get('/mock/v1/formulare/versiuni')
      .map(res => res.json())
      .map(json => {
        return json.map(this.mapFormularToForm)
      })
  }

  private loadFormById(id: string) {
    return this.http.get(`/mock/v1/formulare?IdFormular=${id}`)
      .map(res => res.json())
      .map(this.mapFormularToForm)
  }

  private mapFormularToForm(formular): EditableForm {
    //  i don't have time to figure out why `this.mapSections` is not working here
    const sections = (formular.sectiuniFormular || []).map(sectiune => new EditableFormSection(
      sectiune.id,
      sectiune.codSectiune,
      sectiune.descriere,
      sectiune.intrebari.map(i => new EditableFormQuestion(
        i.idIntrebare,
        i.codFormular,
        i.codIntrebare,
        i.textIntrebare,
        i.idTipIntrebare,
        i.raspunsuri.map(r => new EditableFormQuestionOption(
          r.idOptiune,
          r.textOptiune,
          r.seIntroduceText,
          false
        ))
      ))
    ));
    return new EditableForm(
      formular.codFormular,
      sections,
      formular.descriere,
      formular.versiune,
      formular.statusFormular === 'COMPLETED'
    );
  }

  private mapFormSetToFormular(formSet: EditableForm) {
    return {
      codFormular: formSet.id,
      descriere: formSet.description,
      versiune: formSet.version,
      statusFormular: formSet.published ? "COMPLETED" : "DRAFT",
      sectiuniFormular: (formSet.sections || []).map(section => ({
        id: section.id,
        codSectiune: section.code,
        descriere: section.description,
        intrebari: section.questions.map(question => ({
          idIntrebare: question.id,
          codFormular: formSet.id,
          codIntrebare: question.code,
          textIntrebare: question.text,
          idTipIntrebare: question.typeId,
          raspunsuri: question.options.map(option => ({
            idOptiune: option.id,
            textOptiune: option.text,
            seIntroduceText: option.isTextOption,
            raspunsCuFlag: option.isFlagged
          }))
        }))
      }))
    };
  }
}
