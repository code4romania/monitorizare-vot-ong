import {of as observableOf} from 'rxjs';

import {catchError, map, switchMap, take, tap} from 'rxjs/operators';
import {
  FormActionTypes,
  FormClearAll,
  FormDeleteAction,
  FormErrorAction,
  FormLoadAction,
  FormLoadCompletedAction,
  FormUploadAction,
  FormUploadCompleteAction,
  FullyLoadFormAction,
  FullyLoadFormCompleteAction
} from './form.actions';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {FormSection} from '../../models/form.section.model';
import {FormsService} from '../../services/forms.service';
import {Router} from '@angular/router';
import {Form} from '../../models/form.model';

@Injectable()
export class FormEffects {

    constructor(private formsService: FormsService,
                private actions: Actions,
                private router: Router) {}

    @Effect()
    loadFormAction = this.actions
        .pipe(ofType(FormActionTypes.LOAD_ALL_FORMS_META)).pipe(
        switchMap(_ => this.formsService.loadForms()),
        map(formInfo => new FormLoadCompletedAction(formInfo.formVersions)),
        catchError(() => observableOf(new FormErrorAction())), );

    @Effect()
    fullyLoadFormAction = this.actions
      .pipe(
        ofType(FormActionTypes.LOAD_ONE_FORM_FULLY),
        map((a: FullyLoadFormAction) => a.formId),
        switchMap(formId =>
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
    formDelete = this.actions
      .pipe(
        ofType(FormActionTypes.DELETE),
        take(1),
        switchMap((a: FormDeleteAction) =>
          this.formsService.deleteForm(a.formId).pipe(
            map(_ => new FormLoadAction()),
          )),
        catchError(() => observableOf(new FormErrorAction()))
      );
}
