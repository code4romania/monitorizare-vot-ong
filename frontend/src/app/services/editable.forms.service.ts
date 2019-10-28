import {Injectable} from '@angular/core';
import {ApiService} from '../core/apiService/api.service';
import {EditableForm} from '../models/editable.form.model';
import {EditableFormSection} from '../models/editable.form.section.model';
import {EditableFormQuestion} from '../models/editable.form.question.model';
import {EditableFormQuestionOption} from '../models/editable.form.question.option.model';
import {Observable} from 'rxjs';

const API = {
  forms: (id = undefined) => id ? `/api/v1/form/${id}` : '/api/v1/form'
};

class BackendFormQuestionOption {
  constructor(
    public idOption: number,
    public text: string,
    public isFreeText: boolean
  ) {
  }
}

class BackendFormQuestion {
  constructor(
    public id: number,
    public formCode: string,
    public code: string,
    public idSection: number,
    public questionType: number,
    public text: string,
    public optionsToQuestions: BackendFormQuestionOption[]
  ) {
  }
}

class BackendFormSection {
  constructor(
    public id: number,
    public uniqueId: string,
    public code: string,
    public description: string,
    public questions: any[]
  ) {
  }
}

class BackendForm {
  constructor(
    public id: number,
    public code: string,
    public description: string,
    public ver: number,
    public formSections: BackendFormSection[]
  ) {
  }
}

class FormVersions {
  constructor(
    public formVersions: BackendForm[]
  ) {
  }
}


@Injectable()
export class EditableFormsService {

  constructor(private http: ApiService) {
  }

  public loadAllForms(): Observable<EditableForm[]> {
    return this.http.get<FormVersions>(API.forms())
      .flatMap(versions => versions.formVersions)
      .map(f => new EditableForm(f.id, f.code, f.formSections, f.description, f.ver))
      .toArray();
  };

  public loadFormById(id: string): Observable<EditableFormSection[]> {
    return this.http.get<BackendFormSection[]>(API.forms(id))
      .map((sections: BackendFormSection[]) =>
        (sections.map(s => new EditableFormSection(s.id, s.code, s.description,
          s.questions.map((q: BackendFormQuestion) => new EditableFormQuestion(q.id, q.idSection, q.code, q.text, q.questionType,
            q.optionsToQuestions.map((o: BackendFormQuestionOption) => new EditableFormQuestionOption(o.idOption, o.text, o.isFreeText)))))
        ))
      );
  }

}
