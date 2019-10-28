import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/store.module';
import {Subscription} from 'rxjs';
import {EditableFormsAddFormToSetAction, EditableFormsDeleteFormAction,} from '../../../store/editable-forms/editable.forms.actions';
import {EditableForm} from '../../../models/editable.form.model';

@Component({
  selector: 'app-editable-form-sections',
  templateUrl: './editable-form-sections.component.html',
  styleUrls: ['./editable-form-sections.component.scss']
})
export class EditableFormSectionsComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  selectedFormSet: EditableForm;

  constructor(private store: Store<AppState>,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.subs.push(
      this.activeRoute.params
        .switchMap((params: Params) => this.store
          .select(s => s.editableForms.forms)
          .concatMap( forms => forms)
          .filter( form => form.id === parseInt(params.id))
        )
        .subscribe(selectedFormSet => this.selectedFormSet = selectedFormSet)
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  addNewForm() {
    this.store.dispatch(new EditableFormsAddFormToSetAction(this.selectedFormSet));
  }

  deleteFormSection(formSectionId: number) {
    this.store.dispatch(new EditableFormsDeleteFormAction({
      formSet: this.selectedFormSet,
      formId: formSectionId
    }));
  }
}
