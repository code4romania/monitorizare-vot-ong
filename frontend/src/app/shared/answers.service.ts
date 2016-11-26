import { Nota } from '../models/nota.model';
import { Formular } from '../models/formular.model';
import { Answer } from '../models/answer.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AnswersService {

    constructor(private http: Http) { }

    getAll(urgent = false) {
        return this.http.get('/api/v1/raspunsuri', {
            body: {
                urgent: urgent
            }
        })
        .map(res => <Answer[]>res.json().data)
        .do(console.log)
    }

    getForm(idFormular?: number){
        return this.http.get('/api/v1/formulare',{
            body:{
                idFormular: idFormular
            }
        })
            .map(resp => <Formular[]>resp.json().data);
    }
    getNotes(idObservator: number, idSectieDeVotare: number){
        return this.http.get('/api/v1/note',{
            body:{
                idObservator: idObservator,
                idSectieDeVotoare: idSectieDeVotare
            }
        }).map(res => <Nota[]>res.json().data);
    }
}