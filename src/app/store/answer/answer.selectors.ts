import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompletedQuestion } from 'src/app/models/completed.question.model';
import { AnswerState } from './answer.reducer';

export const answer = createFeatureSelector<AnswerState>('answer');

export const getSpecificThreadByObserver = createSelector(
  answer,
  (state: AnswerState, observerId: number) => state.threads.find(thread => thread.idObserver === observerId) 
);

export const getSelectedAnswers = createSelector(
  answer,
  (state: AnswerState) => state.selectedAnswer
)

export const getSelectedAnswersAsObject = createSelector(
  getSelectedAnswers,
  (selectedAnswer: CompletedQuestion[]) => !selectedAnswer
    ? undefined 
    : selectedAnswer.reduce(
      (acc, crt) => {
        acc[crt.id] = {
          ...crt,
          answers: crt.answers.reduce((acc, crt) => (acc[crt.idOption] = crt, acc), {}),
        };

        return acc;
      },
      {}
    )
);