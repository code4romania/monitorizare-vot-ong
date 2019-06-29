import {Injectable} from '@angular/core';
import {ApiService} from '../core/apiService/api.service';
import {EditableForm} from '../models/editable.form.model';
import {EditableFormSection} from '../models/editable.form.section.model';
import {EditableFormQuestion} from '../models/editable.form.question.model';
import {EditableFormQuestionOption} from '../models/editable.form.question.option.model';
import {nextNumericId} from '../shared/id.service';
import {replaceAt} from '../shared/functions';

const DEFAULT_FORM_SET_DESCRIPTION = 'This is newly generated';
const DEFAULT_QUESTION_TEXT = 'This is newly generated description';

const API = {
  forms: (id = undefined) => id ? `/mock/v1/formulare?IdFormular=${id}` : '/mock/v1/formulare',
  formsVersions: '/mock/v1/formulare/versiuni',
};

@Injectable()
export class EditableFormsService {

  constructor(private http: ApiService) {
  }

  loadAllForms = () => {
    return this.http.get('/mock/v1/formulare/versiuni')
      .map(res => res.json())
      .map(json => {
        return json.map(this.mapFormularToForm)
      })
  };

  loadFormById = (id: string) => {
    return this.http.get(API.forms(id))
      .map(res => res.json())
      .map(this.mapFormularToForm)
  };

  createFormSet = () => {
    return this.http.post(API.forms(), {});
  };

  addFormToSetSet = (formSet: EditableForm) => {
    const existingIds = formSet.sections.map(section => section.id);
    const updatedFormSet = {
      ...formSet,
      sections: [
        new EditableFormSection(nextNumericId(existingIds), formSet.id, DEFAULT_FORM_SET_DESCRIPTION, []),
        ...formSet.sections
      ]
    };
    return this.http.put(API.forms(), this.mapFormSetToFormular(updatedFormSet));
  };

  deleteFormFromSet = (formSet: EditableForm, formId: number) => {
    const updatedFormSet = {
      ...formSet,
      sections: formSet.sections.filter(section => section.id !== formId)
    };
    return this.http.put(API.forms(), this.mapFormSetToFormular(updatedFormSet));
  };

  addQuestionToForm = (formSet: EditableForm, formId: number) => {
    const updatedFormIndex = formSet.sections.findIndex(s => s.id === formId);
    const existingForm = formSet.sections[updatedFormIndex];
    const createdQuestion = new EditableFormQuestion(
      nextNumericId(existingForm.questions.map(q => q.id)),
      formId,
      existingForm.id,
      DEFAULT_QUESTION_TEXT,
      1,
      []
    );
    const nextForm = new EditableFormSection(
      existingForm.id,
      existingForm.code,
      existingForm.description,
      [
        createdQuestion,
        ...existingForm.questions
      ]
    );
    const nextFormSet = new EditableForm(
      formSet.id,
      replaceAt(formSet.sections, updatedFormIndex, nextForm),
      formSet.description,
      formSet.version,
      formSet.published
    );
    return this.http.put(API.forms(), this.mapFormSetToFormular(nextFormSet));
  };

  deleteQuestionFromForm = (formSet: EditableForm, formId: number, questionId: number) => {
    const updatedFormIndex = formSet.sections.findIndex(s => s.id === formId);
    const existingForm = formSet.sections[updatedFormIndex];
    const nextForm = new EditableFormSection(
      existingForm.id,
      existingForm.code,
      existingForm.description,
      existingForm.questions.filter(q => q.id !== questionId)
    );
    const nextFormSet = new EditableForm(
      formSet.id,
      replaceAt(formSet.sections, updatedFormIndex, nextForm),
      formSet.description,
      formSet.version,
      formSet.published
    );
    return this.http.put(API.forms(), this.mapFormSetToFormular(nextFormSet));
  };

  deserialize = (clientInput) => {
    return this.mapFormularToForm(clientInput);
  };

  private mapFormularToForm = (formular) => {
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
  };

  private mapFormSetToFormular = (formSet: EditableForm) => {
    return {
      codFormular: formSet.id,
      descriere: formSet.description,
      versiune: formSet.version,
      statusFormular: formSet.published ? 'COMPLETED' : 'DRAFT',
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
  };

}
