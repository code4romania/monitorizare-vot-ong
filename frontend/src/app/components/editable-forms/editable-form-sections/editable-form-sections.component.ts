import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/store.module';
import {Subscription} from 'rxjs';
import {EditableFormsUpdateFormSetAction,} from '../../../store/editable-forms/editable.forms.actions';
import {EditableForm} from '../../../models/editable.form.model';
import {EditableFormSection} from '../../../models/editable.form.section.model';
import {nextNumericId} from '../../../shared/id.service';

const DEFAULT_FORM_SET_DESCRIPTION = "This is newly generated";

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
          .filter( form => form.id === params.id)
        )
        .subscribe(selectedFormSet => this.selectedFormSet = selectedFormSet)
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  addNewForm() {
    const existingIds = this.selectedFormSet.sections.map(section => section.id);
    const updatedFormSet = {
      ...this.selectedFormSet,
      sections: [
        new EditableFormSection(nextNumericId(existingIds), this.selectedFormSet.id, DEFAULT_FORM_SET_DESCRIPTION, []),
        ...this.selectedFormSet.sections
      ]
    };
    this.store.dispatch(new EditableFormsUpdateFormSetAction(updatedFormSet));
  }

  deleteFormSection(formSectionId: number) {
    const updatedFormSet = {
      ...this.selectedFormSet,
      sections: this.selectedFormSet.sections.filter(section => section.id !== formSectionId)
    };
    this.store.dispatch(new EditableFormsUpdateFormSetAction(updatedFormSet));
  }
}
