import { environment } from '../../environments/environment';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ApiService, QueryParamBuilder } from '../core/apiService/api.service';

@Injectable()
export class AnswersService {
	private baseUrl: string;

	constructor(private http: ApiService) {
		this.baseUrl = environment.apiUrl;
	}

	downloadAnswers(filter: AnswersPackFilter) {
		let paramBuilder = QueryParamBuilder
      .Instance('/api/v1/export/all');

  for (const key in filter) {
		    const value = filter[key];
		    paramBuilder = paramBuilder.withParam(key, value);
		}
		const urlWithParams = paramBuilder.build();

		const url: string = Location.joinWithSlash(this.baseUrl, urlWithParams);
		return this.http.get<Blob>(url, {responseType: 'blob' as 'json'});
	}
}

export interface AnswersPackFilter {
	idNgo?: number;
	idObserver?: number;
	phoneObserver?: number;
	pollingStationNumber?: number;
	county?: string;
	from?: string;
	to?: string;
}
