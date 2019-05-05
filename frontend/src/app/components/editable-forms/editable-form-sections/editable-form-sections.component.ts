import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/store.module';
import {Subscription} from 'rxjs';
import {Form} from '../../../models/form.model';
import {EditableFormsLoadByIdAction} from '../../../store/editable-forms/editable.forms.actions';

@Component({
  selector: 'app-editable-form-sections',
  templateUrl: './editable-form-sections.component.html',
  styleUrls: ['./editable-form-sections.component.scss']
})
export class EditableFormSectionsComponent implements OnInit, OnDestroy {
  sub: Subscription;
  editedForm: Form;
  constructor(private store: Store<AppState>, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.store.select(s => s.editableForms.edited)
      .subscribe(current => this.editedForm = current);
  }

  ngOnDestroy(){
    if (this.sub){
      this.sub.unsubscribe();
    }
  }

}
