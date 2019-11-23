import { environment } from 'environments/environment';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ApiService, QueryParamBuilder } from 'app/core/apiService/api.service';

@Injectable()
export class AnswersService {
	private baseUrl: string;

	constructor(private http: ApiService) {
		this.baseUrl = environment.apiUrl;
	}

	downloadAnswers(filter: AnswersPackFilter) {
		let paramBuilder = QueryParamBuilder
      .Instance('/api/v1/export/all');

    for (let key in filter) {
		    let value = filter[key];
		    paramBuilder = paramBuilder.withParam(key, value);
		}
		const urlWithParams = paramBuilder.build();

		const url: string = Location.joinWithSlash(this.baseUrl, urlWithParams);
		return this.http.get(url, {
			responseType: 'blob'
		});
	}
}

export interface AnswersPackFilter {
	idNgo?: number, 
	idObserver?: number,
	pollingStationNumber?: number,
	county?: string,
	from?: string,
	to?: string
}