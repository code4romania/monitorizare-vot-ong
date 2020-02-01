
import {map, switchMap} from 'rxjs/operators';
import { Note } from '../../models/note.model';
import { LoadNotesAction, LoadNotesDoneAction, NoteActionTypes } from './note.actions';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { ApiService } from '../../core/apiService/api.service';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Location } from '@angular/common';

@Injectable()
export class NoteEffects {
    private baseUrl: string;

    constructor(private http: ApiService, private actions: Actions) {
        this.baseUrl = environment.apiUrl;
    }

    @Effect()
    notesStream = this.actions
        .pipe(ofType(NoteActionTypes.LOAD)).pipe(
        switchMap((a: LoadNotesAction) => {
            const notesUrl: string = Location.joinWithSlash(this.baseUrl, '/api/v2/note');

            return this.http.get<Note[]>(notesUrl, { body: a.payload });
        }),
        map(notes => new LoadNotesDoneAction(notes)), );
}
