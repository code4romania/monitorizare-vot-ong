import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Note } from '../../models/note.model';

import { NoteState } from './note.reducer';

export const note = createFeatureSelector<NoteState>('note');

export const getNotes = createSelector(
  note,
  (state: NoteState) => state.notes,
)

export const getNotesAsObject = createSelector(
  getNotes,
  (notes: Note[]) => !notes
    ? {}
    : notes.reduce((acc, crt) => (acc[crt.questionId] = crt, acc), {})
)