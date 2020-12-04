import { environment } from '../../environments/environment';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ApiService, QueryParamBuilder } from '../core/apiService/api.service';
import { AnswerExtraConstructorData } from '../models/answer.extra.model';
import {HttpParams} from '@angular/common/http';
import {first} from 'rxjs/operators';

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
      if (filter.hasOwnProperty(key)) {
        const value = filter[key];
        paramBuilder = paramBuilder.withParam(key, value);
      }
		}
		const urlWithParams = paramBuilder.build();

		const url: string = Location.joinWithSlash(this.baseUrl, urlWithParams);
		return this.http.get<Blob>(url, {responseType: 'blob' as 'json'}).pipe(first());
	}

  downloadNotes(filter: AnswersPackFilter) {
    const filterStringEntries = Object.entries(filter).map(([k, v]) => [k, v.toString()]);
    const params = new HttpParams({fromObject: Object.fromEntries(filterStringEntries)});
    const url = Location.joinWithSlash(this.baseUrl, '/api/v1/export/all/notes');
    return this.http.get<Blob>(url, {params, responseType: 'blob' as 'json'}).pipe(first());
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
