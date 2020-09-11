import { ApiService } from '../core/apiService/api.service';
import { Injectable } from '@angular/core';
import { FormInfo, FormDetails } from '../models/form.info.model';
import { Location } from '@angular/common';
import { ApiListResponse } from '../models/api-list-response.model';
import { Form } from '../models/form.model';
import { FormSection } from '../models/form.section.model';
import { environment } from '../../environments/environment';


@Injectable()
export class FormsService {
  private baseUrl: string;
  selectedForm: FormDetails;
  form: Form;
  continueEditing: boolean;

  constructor(private http: ApiService) {
    this.baseUrl = environment.apiUrl;
  }

  public loadForms() {
    const url: string = Location.joinWithSlash(this.baseUrl, '/api/v1/form');
    return this.http.get<FormInfo>(url).pipe();
  }

  public searchForms(name: string, pageNo?: number, pageSize?: number) {
    // TODO: enable search forms after BE is implemented
    // let url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/form/search?Description=${name}`);
    //
    // if (pageNo > 0 && pageSize > 0) {
    //   url = Location.joinWithSlash(this.baseUrl, `/api/v1/form/search?Description=${name}&Page=${pageNo}&PageSize=${pageSize}`);
    // }
    const url = Location.joinWithSlash(this.baseUrl, '/api/v1/form');

    return this.http.get<FormInfo>(url).pipe();
  }

  public getForm(formId: number) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/form/${formId}`);
    return this.http.get<FormSection[]>(url);
  }

  public saveForm(form: Form) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/form`);
    return this.http.post(url, form);
  }

  public saveAndPublishForm(form: Form) {
    return this.saveForm(form);
  }
}
