import {Injectable} from '@angular/core';
import {ApiService} from '../core/apiService/api.service';
import {EditableForm} from '../models/editable.form.model';
import {EditableFormSection} from '../models/editable.form.section.model';
import {EditableFormQuestion} from '../models/editable.form.question.model';
import {EditableFormQuestionOption} from '../models/editable.form.question.option.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const API = {
  forms: (id = undefined) => id ? `/api/v1/form/${id}` : '/api/v1/form',
  options: (id = undefined) => id ? `/api/v1/option/${id}` : '/api/v1/option',
  createOption: () => `/api/v1/option/create`
};

@Injectable()
export class EditableFormsService {

  private baseUrl: string;
  constructor(private http: ApiService) {
    this.baseUrl = environment.apiUrl;
  }

  public loadAllForms(): Observable<EditableForm[]> {
    return this.http.get<FormVersions>(this.baseUrl + API.forms())
      .flatMap(versions => versions.formVersions)
      .map(f => new EditableForm(f.id, f.code, f.formSections || [], f.description, f.ver))
      .toArray();
  };

  public loadFormById(id: string): Observable<EditableFormSection[]> {
    return this.http.get<BackendFormSection[]>(this.baseUrl + API.forms(id))
      .map((sections: BackendFormSection[]) => (
        (sections || []).map(s => new EditableFormSection(s.id, s.code, s.uniqueId, s.description,
          (s.questions || []).map((q: BackendFormQuestion) => new EditableFormQuestion(q.id, q.idSection, q.code, q.text, q.questionType,
            (q.optionsToQuestions || []).map((o: BackendFormQuestionOption) => new EditableFormQuestionOption(o.idOption, o.text, o.isFreeText)))))
        ))
      );
  }

  public loadAllFormsOptions(): Observable<EditableFormQuestionOption[]> {
    return this.http.get<BackendFormOption[]>(this.baseUrl + API.options())
      .map((options: BackendFormOption[]) => (
        options.map(o => new EditableFormQuestionOption(o.id, o.text, o.isFreeText))
      ));
  };

  public saveOption(option: EditableFormQuestionOption): Observable<EditableFormQuestionOption> {
    console.log(`Saving new option: ${option.text}`, option);
    return this.http.post<BackendFormOption>(this.baseUrl + API.createOption(), {
      text: option.text
    })
      .map( (o: BackendFormOption) => new EditableFormQuestionOption(o.id, o.text, o.isFreeText));
  }

  public saveFormSet(formSet: EditableForm): Observable<string>{
    let form: BackendForm = new BackendForm(formSet.code, formSet.description,
      formSet.sections.map(section => new BackendFormSection(section.code, section.description,
        section.questions.map(question => new BackendFormQuestion(formSet.code, question.code, question.typeId, question.text,
          question.options.map(option => new BackendFormQuestionOption(option.id)))))));
    console.log(`Saving the form ${formSet}: with the following serialization:\n`, JSON.stringify(form, null, 2));
    return this.http.post<string>(this.baseUrl + API.forms(), form);
  }
}

class BackendFormOption{
  constructor(
    public id: number,
    public text: string,
    public isFreeText: boolean,
    public hint: string
  ){}
}

class BackendFormQuestionOption {
  constructor(
    public idOption: number,
    public text: string = undefined,
    public isFreeText: boolean = false
  ) {
  }
}

class BackendFormQuestion {
  constructor(
    public formCode: string,
    public code: string,
    public questionType: number,
    public text: string,
    public optionsToQuestions: BackendFormQuestionOption[],
    public id: number = undefined,
    public idSection:number = undefined
  ) {
  }
}

class BackendFormSection {
  constructor(
    public code: string,
    public description: string,
    public questions: any[],
    public id: number = undefined,
    public uniqueId: string = undefined
  ) {
  }
}

class BackendForm {
  constructor(
    public code: string,
    public description: string,
    public formSections: BackendFormSection[],
    public id: number = undefined,
    public ver: number = undefined
  ) {
  }
}

class FormVersions {
  constructor(
    public formVersions: BackendForm[]
  ) {
  }
}
