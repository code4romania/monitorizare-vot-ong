import { of as observableOf } from 'rxjs';

import {catchError, filter, map, mergeAll, mergeMap, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {
  fetchAllFormTabs,
  FormActionTypes,
  FormDeleteAction,
  FormErrorAction,
  FormLoadAction,
  FormLoadCompletedAction,
  FormUpdateAction,
  FormUploadAction,
  FormUploadCompleteAction,
  FullyLoadFormAction,
  FullyLoadFormCompleteAction
} from './form.actions';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { FormSection } from '../../models/form.section.model';
import { FormsService } from '../../services/forms.service';
import { Router } from '@angular/router';
import { Form } from '../../models/form.model';
import { Store } from '@ngrx/store';
import { form, getFormItems, getFullyLoadedForms } from './form.selectors';

@Injectable()
export class FormEffects {

  constructor(
    private formsService: FormsService,
    private actions: Actions,
    private router: Router,
    private store: Store
  ) { }

  @Effect()
  loadFormAction = this.actions
    .pipe(
      ofType(FormActionTypes.LOAD_ALL_FORMS_META),
      map((action: FormLoadAction) => action),
      withLatestFrom(this.store.select(form)),
      filter(([action, crtFormState]) => !!crtFormState.items === false || action.forceReload),
      switchMap(([action, _]) =>
        this.formsService.loadForms(action.draft).pipe(
          map(formInfo => new FormLoadCompletedAction(formInfo.formVersions)),
          catchError(() => observableOf(new FormErrorAction())),
        )
      ),
    );

  @Effect()
  fullyLoadFormAction = this.actions
    .pipe(
      ofType(FormActionTypes.LOAD_ONE_FORM_FULLY),
      map((a: FullyLoadFormAction) => a.formId),
        mergeMap(formId =>
        this.formsService.getForm(formId)
          .pipe(
            map((sections: FormSection[]) => {
              const form = new Form();
              form.id = formId;
              form.formSections = sections;
              return new FullyLoadFormCompleteAction(form);
            })
          )
      ),
      catchError(() => observableOf(new FormErrorAction()))
    );

  @Effect()
  formUpload = this.actions
    .pipe(
      ofType(FormActionTypes.UPLOAD),
      switchMap((a: FormUploadAction) =>
        this.formsService.saveForm(a.form).pipe(
          map(_ => new FormUploadCompleteAction())
        )),
      catchError(() => observableOf(new FormErrorAction()))
    );

  @Effect()
  formUploadPublish = this.actions
    .pipe(
      ofType(FormActionTypes.UPLOAD_PUBLISH),
      switchMap((a: FormUploadAction) =>
        this.formsService.saveAndPublishForm(a.form).pipe(
          map(_ => new FormUploadCompleteAction())
        )),
      catchError(() => observableOf(new FormErrorAction()))
    );

  @Effect()
  formUploadSuccess = this.actions
    .pipe(
      ofType(FormActionTypes.UPLOAD_COMPLETE),
      take(1),
      tap(_ => this.router.navigate(['formulare']))
    );

  @Effect()
  formUpdate = this.actions
    .pipe(
      ofType(FormActionTypes.UPDATE),
      switchMap((a: FormUpdateAction) =>
        this.formsService.updateForm(a.form).pipe(
          map(_ => new FormLoadAction(a.form.draft,true))
        )),
      catchError(() => observableOf(new FormErrorAction()))
    );

  @Effect()
  formDelete = this.actions
    .pipe(
      ofType(FormActionTypes.DELETE),
      take(1),
      switchMap((a: FormDeleteAction) =>
        this.formsService.deleteForm(a.form.id).pipe(
          map(_ => new FormLoadAction(a.form.draft, true)),
        )),
      catchError(() => observableOf(new FormErrorAction()))
    );

  fetchAllFormTabs = createEffect(
    () => this.actions.pipe(
      ofType(fetchAllFormTabs),
      withLatestFrom(this.store.select(getFormItems), this.store.select(getFullyLoadedForms)),
      filter(([, formTabs, loadedForms]) => formTabs.length !== Object.keys(loadedForms).length),
      map(([, formTabs, loadedForms]) =>  formTabs.filter(f => !loadedForms[f.id]).map(f => new FullyLoadFormAction(f.id))),
      mergeAll(),
    )
  )
}
