import {Component, OnDestroy, OnInit} from '@angular/core';
import {EditableFormSection} from '../../../models/editable.form.section.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/store.module';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {
  EditableFormsAddFormQuestionAction,
  EditableFormsDeleteFormQuestionAction, EditableFormsUpdateFormQuestionAction
} from '../../../store/editable-forms/editable.forms.actions';
import {EditableForm} from '../../../models/editable.form.model';

@Component({
  selector: 'app-form-section-questions',
  templateUrl: './form-section-questions.component.html',
  styleUrls: ['./form-section-questions.component.scss']
})
export class FormSectionQuestionsComponent implements OnInit, OnDestroy {
  private formSet: EditableForm;
  private section: EditableFormSection;
  private subs: Subscription[] = [];
  private editMode: boolean = false;

  constructor(private store: Store<AppState>,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.subs.push(
      this.loadFormSet(),
      this.loadFormSection(),
      this.loadEditMode()
    );
  }

  private loadFormSet = () => {
    return this.activeRoute.params
      .switchMap((params: Params) => {
        return this.store.select(s => s.editableForms.forms)
          .concatMap(forms => forms)
          .filter( f => f.id === params.formSetId)
      })
      .subscribe(selectedFormSet => {
        this.formSet = selectedFormSet;
      })
  };

  private loadFormSection = () => {
    return this.activeRoute.params
      .switchMap((params: Params) => {
        console.log('Params for questions got changed:', params);
        return this.store.select(s => s.editableForms.forms)
          .concatMap(forms => forms)
          .filter(f => f.id === params.formSetId)
          .flatMap(forms => forms.sections)
          .filter(section => section.id === parseInt(params.formId));
      })
      .subscribe(selectedFormSection => {
        console.log('We received a form: ', selectedFormSection);
        this.section = selectedFormSection;
      })
  };

  private loadEditMode = () => {
    return this.activeRoute.queryParams.subscribe(
      (params: Params) => this.editMode = params.edit === 'true');
  };

  onAddQuestion() {
    this.store.dispatch(new EditableFormsAddFormQuestionAction({
      formSet: this.formSet,
      formId: this.section.id
    }));
  }

  onDeleteQuestion(questionId) {
    this.store.dispatch(new EditableFormsDeleteFormQuestionAction({
      formSet: this.formSet,
      formId: this.section.id,
      questionId: questionId
    }));
  }

  onUpdateQuestion(question) {
    this.store.dispatch(new EditableFormsUpdateFormQuestionAction({
      formSet: this.formSet,
      formId: this.section.id,
      question: question
    }))
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}