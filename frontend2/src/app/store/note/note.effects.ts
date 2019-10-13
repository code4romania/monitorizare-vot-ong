import {Note} from '../../models/note.model';
import {LoadNotesAction, LoadNotesDoneAction, NoteActionTypes} from './note.actions';
import {Actions, Effect} from '@ngrx/effects';
import {ApiService} from '../../core/apiService/api.service';
import {Injectable} from '@angular/core';

@Injectable()
export class NoteEffects {
    constructor(private http: ApiService, private actions: Actions) { }

    @Effect()
    notesStream = this.actions
        .ofType(NoteActionTypes.LOAD)
        .switchMap((a: LoadNotesAction) => this.http.get<Note[]>('/api/v1/note', { body: a.payload }))
        .map(notes => new LoadNotesDoneAction(notes))
}
