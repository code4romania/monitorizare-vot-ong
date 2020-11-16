import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnswerState } from './answer.reducer';

export const answer = createFeatureSelector<AnswerState>('answer');

export const getSpecificThreadByObserver = createSelector(
  answer,
  (state: AnswerState, observerId: number) => state.threads.find(thread => thread.idObserver === observerId) 
);