import { ApiService } from '../core/apiService/api.service';
import { Form } from '../models/form.model';
import { Note } from '../models/note.model';
import { PaginationData } from '../shared/pagination.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AnswersService {


    constructor(private http: ApiService) { }


    getAll(urgent = false, paginationData?: PaginationData) {
        let body = Object.assign({ urgent: urgent }, paginationData);
        return this.http.get('/api/v1/raspunsuri', {
            body: body
        })
            .map(res => res.json())
    }

    getForm(idFormular?: number) {
        return this.http.get('/api/v1/formulare', {
            body: {
                idFormular: idFormular
            }
        })
            .map(resp => <Form[]>resp.json().data)
    }
    getNotes(idObservator: number, idSectieDeVotare: number) {
        return this.http.get('/api/v1/note', {
            body: {
                idObservator: idObservator,
                idSectieDeVotoare: idSectieDeVotare
            }
        }).map(res => <Note[]>res.json().data)
    }
}