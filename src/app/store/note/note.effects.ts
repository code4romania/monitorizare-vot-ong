import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Note } from '../../models/note.model';
import {
  LoadNotesAction,
  LoadNotesDoneAction,
  NoteActionTypes,
} from './note.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApiService } from '../../core/apiService/api.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { note } from './note.selectors';

@Injectable()
export class NoteEffects {
  private baseUrl: string;

  constructor(
    private http: ApiService, 
    private actions: Actions,
    private store: Store,
  ) {
    this.baseUrl = environment.apiUrl;
  }

  @Effect()
  notesStream = this.actions.pipe(
    ofType(NoteActionTypes.LOAD),
    withLatestFrom(this.store.select(note)),
    filter(([, crtNoteState]) => !!crtNoteState.notes === false),
    map(([action]) => action),
    switchMap((a: LoadNotesAction) => {
      const notesUrl: string = Location.joinWithSlash(
        this.baseUrl,
        '/api/v2/note'
      );

      return this.http.get<Note[]>(notesUrl, { body: a.payload });
    }),
    map((notes) => new LoadNotesDoneAction(notes))
  );
}
