import {ApiService} from '../core/apiService/api.service';
import {Note} from '../models/note.model';
import {PaginationData} from '../shared/pagination.interface';
import {Injectable} from '@angular/core';

@Injectable()
export class AnswersService {


    constructor(private http: ApiService) { }


    getAll(urgent = false, paginationData?: PaginationData) {
        let body = Object.assign({ urgent: urgent }, paginationData);
        return this.http.get<any>('/api/v1/answers', {
            body: body
        })
    }
    getNotes(idObservator: number, idSectieDeVotare: number) {
        return this.http.get<{data: Note[]}>('/api/v1/note', {
            body: {
                idObservator: idObservator,
                idSectieDeVotoare: idSectieDeVotare
            }
        })
    }
}
