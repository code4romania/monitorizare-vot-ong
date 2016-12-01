import { Observable, Observer } from 'rxjs/Rx';
import { Nota } from '../models/nota.model'
import { Formular } from '../models/formular.model'
import { Answer } from '../models/answer.model'
import { Http } from '@angular/http'
import { Injectable } from '@angular/core'

@Injectable()
export class AnswersService {
    private static FORM_IDS = ['A', 'B', 'C'];
    private _formsObservable: Observable<Formular[]>

    constructor(private http: Http) { }

    getAllForms() {

        if (this._formsObservable) {
            return this._formsObservable
        }
        let httpObs = AnswersService.FORM_IDS
                    .map(id => {
                        return this.http.get('/api/v1/formulare', {
                            body: { idFormular: id }
                        }).map(res => <Formular>res.json().data)
                    }); 
        this._formsObservable = Observable.combineLatest(httpObs)
                .do(value => console.log(`Flattened observable : ${value}`))
                .publishReplay(1)
                .refCount()
                .do(value => console.log(`Response: ${value}`))
        return this._formsObservable;
    }


    getAll(urgent = false) {
        return this.http.get('/api/v1/raspunsuri', {
            body: {
                urgent: urgent
            }
        })
            .map(res => <Answer[]>res.json().data)
    }

    getForm(idFormular?: number) {
        return this.http.get('/api/v1/formulare', {
            body: {
                idFormular: idFormular
            }
        })
            .map(resp => <Formular[]>resp.json().data)
    }
    getNotes(idObservator: number, idSectieDeVotare: number) {
        return this.http.get('/api/v1/note', {
            body: {
                idObservator: idObservator,
                idSectieDeVotoare: idSectieDeVotare
            }
        }).map(res => <Nota[]>res.json().data)
    }
}