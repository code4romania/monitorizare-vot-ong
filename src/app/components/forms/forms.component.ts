import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormDetails} from '../../models/form.info.model';
import {AppState} from '../../store/store.module';
import {select, Store} from '@ngrx/store';
import {map, take} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {FormState} from '../../store/form/form.reducer';
import {FormDeleteAction, FormLoadAction} from '../../store/form/form.actions';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {cloneDeep} from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit, OnDestroy {
  formsList: FormDetails[];
  pageSize = 10;
  totalCount = 0;
  page = 1;

  formsSubscription: Subscription;

  constructor(private store: Store<AppState>, private _modalService: NgbModal) { }

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
        this.formsList = cloneDeep(formState.items);
        this.totalCount = this.formsList.length;
      });
  }

  public deleteForm(form: FormDetails) {
    const modalRef = this._modalService.open(ConfirmationModalComponent)
    modalRef.componentInstance.message = 'Are you sure you want to delete this record?';
    modalRef.result
    .then(() => this.store.dispatch(new FormDeleteAction(form.id)))
    .catch(() => { });
  }

  ngOnDestroy(): void {
    this.formsSubscription.unsubscribe();
  }

  onReorder(event: CdkDragDrop<FormDetails[]>) {
    moveItemInArray(this.formsList, event.previousIndex, event.currentIndex);
  }
}
