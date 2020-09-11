import {of as observableOf} from 'rxjs';

import {catchError, map, switchMap, take, tap} from 'rxjs/operators';
import {Form} from '../../models/form.model';
import {
  FormActionTypes, FormClearAll, FormDeleteAction,
  FormErrorAction, FormLoadAction,
  FormLoadCompletedAction,
  FormUploadAction, FormUploadCompleteAction,
  FullyLoadFormAction,
  FullyLoadFormCompleteAction
} from './form.actions';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {FormSection} from '../../models/form.section.model';
import {environment} from 'environments/environment';
import {FormsService} from '../../services/forms.service';
import {Router} from '@angular/router';

@Injectable()
export class FormEffects {
    private baseUrl: string;

    constructor(private formsService: FormsService,
                private actions: Actions,
                private router: Router) {
        this.baseUrl = environment.apiUrl;
    }

    @Effect()
    loadFormAction = this.actions
        .pipe(ofType(FormActionTypes.LOAD)).pipe(
        switchMap(_ => this.formsService.loadForms()),
        map(formInfo => new FormLoadCompletedAction(formInfo.formVersions)),
        catchError(() => observableOf(new FormErrorAction())), );

    @Effect()
    fullyLoadFormAction = this.actions
      .pipe(
        ofType(FormActionTypes.FULLY_LOAD),
        map((a: FullyLoadFormAction) => a.formDetails),
        map(formDetails => {
          return {
            details: formDetails,
            formSections: this.formsService.getForm(formDetails.id)
          };
        }),
        map(helper =>
          helper.formSections.pipe(
            tap((sections: FormSection[]) => {
              const form = new Form();
              Object.keys(helper.details).forEach(key => form[key] = helper.details[key]);
              form.formSections = sections;
              return form;
            })
          ),
        map((form: Form) => new FullyLoadFormCompleteAction(form))),
        catchError(() => observableOf(new FormErrorAction()))
      );

    @Effect()
    formUpload = this.actions
      .pipe(
        ofType(FormActionTypes.UPLOAD),
        take(1),
        map((a: FormUploadAction) => this.formsService.saveForm(a.form)),
        map(_ => new FormUploadCompleteAction()),
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
        switchMap((a: FormDeleteAction) => this.formsService.deleteForm(a.formId)),
        map(_ => [new FormClearAll(), new FormLoadAction()]),
        catchError(() => observableOf(new FormErrorAction()))
      );
}
