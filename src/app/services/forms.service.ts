import { ApiService } from '../core/apiService/api.service';
import { Injectable } from '@angular/core';
import { FormInfo } from '../models/form.info.model';
import { Location } from '@angular/common';
import { Form } from '../models/form.model';
import { FormSection } from '../models/form.section.model';
import { environment } from 'src/environments/environment';
import { cloneDeep } from 'lodash';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class FormsService {
  private baseUrl: string;

  constructor(private http: ApiService) {
    this.baseUrl = Location.joinWithSlash(environment.apiUrl, '/api/v1/form');
  }

  public loadForms(draft: boolean = false) {
    const url: string = Location.joinWithSlash(this.baseUrl, `?draft=${draft}`);
    return this.http.get<FormInfo>(url).pipe();
  }

  public searchForms(name: string, pageNo?: number, pageSize?: number) {
    // TODO: enable search forms after BE is implemented
    // let url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/form/search?Description=${name}`);
    //
    // if (pageNo > 0 && pageSize > 0) {
    //   url = Location.joinWithSlash(this.baseUrl, `/api/v1/form/search?Description=${name}&Page=${pageNo}&PageSize=${pageSize}`);
    // }
    return this.http.get<FormInfo>(this.baseUrl).pipe();
  }

  public getForm(formId: number) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/${formId}`);
    return this.http.get<FormSection[]>(url);
  }

  public saveForm(form: Form) {
    const formClone = cloneDeep(form);
    formClone.draft = true;

    return this.uploadForm(formClone);
  }

  public saveAndPublishForm(form: Form) {
    const formClone = cloneDeep(form);
    formClone.draft = false;

    return this.uploadForm(formClone);
  }

  public updateForm(form: Form) {
    return this.http.put(this.baseUrl, form);
  }

  private uploadForm(form: Form) {
    if (!form.currentVersion) {
      form.currentVersion = 1;
    }

    return this.http.post(this.baseUrl, form);
  }

  public deleteForm(formId: number) {
    const params = new HttpParams({ fromObject: { formId: String(formId) } });
    return this.http.delete(this.baseUrl, { params });
  }
}
