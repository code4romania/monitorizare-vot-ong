import {Component, OnInit} from '@angular/core';
import {FormDetails} from '../../models/form.info.model';
import {AppState} from '../../store/store.module';
import {select, Store} from '@ngrx/store';
import {map, take} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {FormState} from '../../store/form/form.reducer';
import {FormDeleteAction, FormLoadAction} from '../../store/form/form.actions';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  formsList: FormDetails[];
  pageSize = 10;
  totalCount = 0;
  page = 1;

  formsSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.loadForms(1, this.pageSize);
    this.handleFormsData();
  }

  private loadForms(pageNo: number, pageSize: number) {
    this.store
      .pipe(
        select(s => s.form),
        take(1),
        map((storeItem: FormState) => new FormLoadAction())
      )
      .subscribe(action => this.store.dispatch(action));
  }

  private handleFormsData() {
    this.formsSubscription = this.store
      .select(state => state.form)
      .subscribe(formState => {
        this.formsList = formState.items;
        this.totalCount = this.formsList.length;
      });
  }

  pageChanged(event) {
    if (event.page && event.pageSize) {
      this.page = event.page;
      this.pageSize = event.pageSize;
    }
    this.loadForms(this.page, this.pageSize);
  }

  public deleteForm(form: FormDetails) {
    this.store.dispatch(new FormDeleteAction(form.id));
  }

}