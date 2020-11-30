import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormDetails} from '../../models/form.info.model';
import {AppState} from '../../store/store.module';
import {select, Store} from '@ngrx/store';
import {map, take} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {
  FormDeleteAction,
  FormLoadAction,
  FormUpdateAction
} from '../../store/form/form.actions';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {cloneDeep} from 'lodash';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationModalComponent} from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import {Form} from "../../models/form.model";
import {BASE_BUTTON_VARIANTS, Variants} from "../../shared/base-button/base-button.component";

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
  draftSelected: boolean = false;

  formsSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private _modalService: NgbModal,
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants
  ) {
  }

  ngOnInit() {
    this.loadForms(1, this.pageSize, this.draftSelected);
    this.handleFormsData();
  }

  private loadForms(pageNo: number, pageSize: number, draftSelected: boolean) {
    this.store
      .pipe(
        select(s => s.form),
        take(1),
        map(_ => new FormLoadAction(draftSelected, true))
      )
      .subscribe(action => this.store.dispatch(action));
  }

  private handleFormsData() {
    this.formsSubscription = this.store
      .select(state => state.form)
      .subscribe(formState => {
        this.formsList = cloneDeep(formState.items);
        this.totalCount = this.formsList ? this.formsList.length : 0;
        if(this.formsList !== undefined && this.formsList.length > 0) {
          this.draftSelected = this.formsList[0].draft;
        }
      });
  }

  public deleteForm(formDetails: FormDetails) {
    const modalRef = this._modalService.open(ConfirmationModalComponent)
    modalRef.componentInstance.message = 'Are you sure you want to delete this record?';
    modalRef.result
      .then(() => this.store.dispatch(new FormDeleteAction(Form.fromMetaData(formDetails))))
      .catch(() => {
      });
  }

  public setFormDraftStatus(formDetails: FormDetails, value: boolean) {
    formDetails.draft = value;
    this.store.dispatch(new FormUpdateAction(Form.fromMetaData(formDetails)));
  }

  ngOnDestroy(): void {
    this.formsSubscription.unsubscribe();
  }

  onReorder(event: CdkDragDrop<FormDetails[]>) {
    moveItemInArray(this.formsList, event.previousIndex, event.currentIndex);
  }

  public onTabSelect() {
    this.draftSelected = !this.draftSelected;
    this.loadForms(this.page, this.pageSize, this.draftSelected)
  }
}
