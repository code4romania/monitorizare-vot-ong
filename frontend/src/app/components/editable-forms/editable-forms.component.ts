import {Component, OnDestroy, OnInit} from '@angular/core';
import {EditableForm} from '../../models/editable.forms.model';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/store.module';
import {EditableFormsLoadAllAction} from '../../store/editable-forms/editable.forms.actions';

const draftsFirst = (left, right) => {
  return left.published ? 1 : right.published ? -1 : 0;
};

@Component({
  selector: 'app-editable-forms',
  templateUrl: './editable-forms.component.html',
  styleUrls: ['./editable-forms.component.scss']
})
export class EditableFormsComponent implements OnInit, OnDestroy {
  editableForms: EditableForm[];
  sub: Subscription;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(s => s.editableForms)
      .subscribe(s => {
        this.editableForms = s.forms.sort(draftsFirst);
      });
    this.store.dispatch(new EditableFormsLoadAllAction());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
