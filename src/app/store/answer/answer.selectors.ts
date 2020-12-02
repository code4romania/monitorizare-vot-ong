import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnswerThread } from 'src/app/models/answer.thread.model';
import {CompletedQuestion, CompletedQuestionMap} from 'src/app/models/completed.question.model';
import { AnswerState } from './answer.reducer';
import {CompletedAnswerMap} from '../../models/completed.answer.model';

export const answer = createFeatureSelector<AnswerState>('answer');

export const getSelectedAnswers = createSelector(
  answer,
  (state: AnswerState) => state.selectedAnswer
)

export const getSelectedAnswersAsObject = createSelector(
  getSelectedAnswers,
  (selectedAnswer: CompletedQuestion[]): CompletedQuestionMap => !selectedAnswer
    ? undefined
    : selectedAnswer.reduce<CompletedQuestionMap>(
      (acc, crt) => {
        acc[crt.id] = {
          ...crt,
          answers: crt.answers.reduce<CompletedAnswerMap>(
            (_acc, _crt) => (_acc[_crt.idOption] = _crt, _acc), {}),
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

/** IDs uniquely identifying an answer thread. */
type AnswerThreadIds = {
  idObserver: number;
  idPollingStation: number;
};

export const getSpecificThreadByIds = createSelector(
  getAnswerThreads,
  (threads: AnswerThread[], props: AnswerThreadIds) =>
    threads.find(thread => (thread.idObserver === props.idObserver) &&
      (thread.idPollingStation == props.idPollingStation)
    )
);

export const getSelectedAnswersLoadingStatus = createSelector(
  answer,
  state => state.selectedLoading,
)
