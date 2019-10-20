import { Note } from '../../models/note.model';
import { LoadNotesAction, LoadNotesDoneAction, NoteActionTypes } from './note.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApiService } from '../../core/apiService/api.service';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class NoteEffects {
  @Effect()
  notesStream = this.actions.pipe(
    ofType(NoteActionTypes.LOAD),
    switchMap((a: LoadNotesAction) => this.http.get<Note[]>('/api/v1/note', { body: a.payload })),
    map(notes => new LoadNotesDoneAction(notes)));

  constructor(private http: ApiService, private actions: Actions) {
  }
}
