import { environment } from '../../environments/environment';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ApiService, QueryParamBuilder } from '../core/apiService/api.service';
import { AnswerExtraConstructorData } from '../models/answer.extra.model';

@Injectable({
	providedIn: 'root'
})
export class AnswersService {
	private baseUrl: string = environment.apiUrl;
	private extraDetailsURL = this.baseUrl + '/api/v1/answers/pollingStationInfo';

	constructor(private http: ApiService) { }

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

	fetchExtraDetailsForObserver (observerId: number, sectionId: number) {
		return this.http.get<AnswerExtraConstructorData>(this.extraDetailsURL, {
			body: {
				ObserverId: observerId,
				PollingStationNumber: sectionId,
			},
		});
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
