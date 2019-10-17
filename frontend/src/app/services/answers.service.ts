import { ApiService } from '../core/apiService/api.service';
import { Note } from '../models/note.model';
import { PaginationData } from '../shared/pagination.interface';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'environments/environment';

@Injectable()
export class AnswersService {
    private baseUrl: string;
    constructor(private http: ApiService) {
        this.baseUrl = environment.apiUrl;
    }


    getAll(urgent = false, paginationData?: PaginationData) {
        let body = Object.assign({ urgent: urgent }, paginationData);

        const questionsUrl: string = Location.joinWithSlash(this.baseUrl, '/api/v1/raspunsuri');
        return this.http.get<any>(questionsUrl, {
            body: body
        })
    }
    getNotes(idObservator: number, idSectieDeVotare: number) {
        const notesUrl: string = Location.joinWithSlash(this.baseUrl, '/api/v1/note');

        return this.http.get<{ data: Note[] }>(notesUrl, {
            body: {
                idObservator: idObservator,
                idSectieDeVotoare: idSectieDeVotare
            }
        })
    }
}
