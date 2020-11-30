import { Injectable } from '@angular/core';
import { ApiService } from '../core/apiService/api.service';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common';
import { NgoModel } from '../models/ngo.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class NgosService {

  private baseUrl: string;

  constructor(private http: ApiService) {
    this.baseUrl = environment.apiUrl;
  }

  addNewNgo(ngo: NgoModel) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/ngo`);
    return this.http.post(url, ngo);
  }

  saveChanges(ngo: { [k: string]: any }, info: NgoModel) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/ngo/${info.id}`);
    return this.http.post(url, { ...ngo, idNgo: info.id });
  }

  deleteNgo(id: number) {
    const url: string = Location.joinWithSlash(
      this.baseUrl,
      `/api/v1/ngo/${id}`
    );
    return this.http.delete(url);
  }

  getNgo(id: string) {
    const url: string = Location.joinWithSlash(this.baseUrl,`/api/v1/ngo/${id}`);
    return this.http.get(url);
  }

  updateOrganizerFlag(id: number, value: boolean) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/ngo/${id}/organizer`);
    
    let headers = new HttpHeaders();
    headers =headers.append('Content-Type', 'application/json');

    return this.http.patch(url, { isOrganizer: value }, { headers })
  }

  updateActiveFlag(id: number, value: boolean) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/ngo/${id}/status`);
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.patch(url, {isActive: value} , { headers });
  }
}
