import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnswerThread } from 'src/app/models/answer.thread.model';
import { CompletedQuestion } from 'src/app/models/completed.question.model';
import { AnswerState } from './answer.reducer';

export const answer = createFeatureSelector<AnswerState>('answer');

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

export const getFilters = createSelector(
  answer,
  (state: AnswerState) => state.answerFilters,
);

export const getAnswerThreads = createSelector(
  answer,
  (state: AnswerState) => state.threads ? state.threads : [],
);

export const getSpecificThreadByObserver = createSelector(
  getAnswerThreads,
  (threads: AnswerThread[], observerId: number) => threads.find(thread => thread.idObserver === observerId)
);

export const getSelectedAnswersLoadingStatus = createSelector(
  answer,
  state => state.selectedLoading,
)