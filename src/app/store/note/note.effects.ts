import { distinctUntilChanged, endWith, filter, map, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Note } from '../../models/note.model';
import {
  LoadNotesAction,
  LoadNotesDoneAction,
  NoteActionTypes,
  setLoadingStatusFromEffects,
} from './note.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApiService } from '../../core/apiService/api.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { note } from './note.selectors';
import { NoteState } from './note.reducer';
import { concat } from 'lodash';
import { of } from 'rxjs';

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
    distinctUntilChanged(
      ([prevAction]: [LoadNotesAction, NoteState], [crtAction, crtState]: [LoadNotesAction, NoteState]) => 
        +prevAction.payload.idPollingStation === +crtAction.payload.idPollingStation && !!crtState === true
    ),
    map(([action]) => action),
    switchMap((a: LoadNotesAction) => {
      const notesUrl: string = Location.joinWithSlash(
        this.baseUrl,
        '/api/v2/note'
      );

      return this.http.get<Note[]>(notesUrl, { body: a.payload }).pipe(
        map((notes) => new LoadNotesDoneAction(notes as any)),
        startWith(setLoadingStatusFromEffects({ isLoading: true, })),
        endWith(setLoadingStatusFromEffects({ isLoading: false, }))
      );
    }),
  );
}
