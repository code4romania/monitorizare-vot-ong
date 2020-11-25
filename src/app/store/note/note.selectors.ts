import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Note } from '../../models/note.model';
import { getSelectedAnswersAsObject } from '../answer/answer.selectors';
import { getAllQuestionsGroupedByTabId, getFormItems, getFormItemsById, getFullyLoadedForms } from '../form/form.selectors';

import { NoteState } from './note.reducer';

const emptyResult = [];

export const note = createFeatureSelector<NoteState>('note');

export const getNotes = createSelector(
  note,
  (state: NoteState) => state.notes || [],
);

export const getNotesAsObject = createSelector(
  getNotes,
  (notes: Note[]) => !notes
    ? {}
    : notes.reduce((acc, crt) => (acc[crt.questionId] = crt, acc), {})
);

export const getNotesMergedWithQuestions = createSelector(
  getNotes,
  getFormItemsById,
  getAllQuestionsGroupedByTabId,
  getSelectedAnswersAsObject,
  (notes, tabs, questionsByTabId, selectedAnswers) => {
    const tabsLen = Object.keys(tabs).length;
    if (tabsLen !== Object.keys(questionsByTabId).length || tabsLen === 0) {
      return emptyResult;
    }

    return notes.map(note => {
      const correspondingQuestion = questionsByTabId[note.formId]?.[note.questionId];

      return {
        ...note,
        ...correspondingQuestion 
          ? {
            tabName: tabs[note.formId].description,
            questionCode: correspondingQuestion.code,
            isQuestionFlagged: correspondingQuestion.optionsToQuestions.some(o => o.flagged && selectedAnswers[correspondingQuestion.id]?.answers[o.id]),
            hasCorrespondingQuestion: true,
          } 
          : {
            hasCorrespondingQuestion: false,
          }
      }
    });
  }
);