import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Form} from '../../../models/form.model';
import {Location} from '@angular/common';
import {FormSection} from '../../../models/form.section.model';
import {AppState} from '../../../store/store.module';
import {Store} from '@ngrx/store';
import {FormUploadAction, FullyLoadFormAction} from '../../../store/form/form.actions';
import {Subscription} from 'rxjs';
import {cloneDeep} from 'lodash';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss']
})
export class FormCreateComponent implements OnInit, OnDestroy {

  readonly FORM_ID_URL_PARAM = 'formId';

  title: string;
  form: Form;

  showSection: boolean;
  showOptions: boolean;

  formDataSubscription: Subscription;

  constructor(private location: Location,
              private store: Store<AppState>,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.title = 'Adauga formular nou';
    this.form = new Form();
    this.form.description = '';

    this.activatedRoute.paramMap.subscribe(params => {
      const hasFormId = params.has(this.FORM_ID_URL_PARAM);
      if (!hasFormId) {
        return ;
      }

      const targetFormId = +params.get(this.FORM_ID_URL_PARAM);
      this.loadFormForEditing(targetFormId);
      this.handleLoadedFormData(targetFormId);
    });
  }

  private loadFormForEditing(formId: number) {
    this.store.dispatch(new FullyLoadFormAction(formId));
  }

  private handleLoadedFormData(formId: number) {
    this.formDataSubscription = this.store
      .select(state => state.form.fullyLoaded)
      .subscribe(loadedForms => {
        const correspondingForm = loadedForms[formId];
        if (!correspondingForm) {
          return ;
        }

        this.form = cloneDeep(correspondingForm);
      });
  }

  public onBackPressed() {
    this.location.back();
  }

  addFormSection() {
    this.showOptions = false;
    this.showSection = true;
    if (!this.form.formSections) {
      this.form.formSections = [];
    }
    this.form.formSections.push(new FormSection());
  }

  private prepareForm(): boolean {
    if (!this.form.formSections || this.form.formSections.length <= 0) {
      alert('Formularul trebuie sa contina cel putin o sectiune.');
      return false;
    }

    return true;
  }

  saveForm() {
    const isReady = this.prepareForm();
    if (!isReady) {
      return ;
    }

    this.store.dispatch(new FormUploadAction(this.form));
  }

  onSectionDelete(deletedSection: FormSection) {
    this.form.formSections = this.form.formSections.filter(s => s !== deletedSection);
  }

  ngOnDestroy(): void {
    if (this.formDataSubscription) {
      this.formDataSubscription.unsubscribe();
    }
  }

  onReorder(event: CdkDragDrop<FormSection[]>) {
    moveItemInArray(this.form.formSections, event.previousIndex, event.currentIndex);
  }
}
