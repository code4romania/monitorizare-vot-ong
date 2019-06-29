import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/store.module';
import {EditableFormSection} from '../../../../models/editable.form.section.model';

@Component({
  selector: 'app-question-menu',
  templateUrl: './question-menu.component.html',
  styleUrls: ['./question-menu.component.scss']
})
export class QuestionMenuComponent implements OnInit, OnDestroy {
  private editedFormSection: EditableFormSection;
  private subscriptions: Subscription[] = [];
  constructor(private store:Store<AppState>) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(s => s.editableForms.selectedFormSection).subscribe(
        section => this.editedFormSection = section
      )
    );
  }

  addNewFormSection() {
    console.log('new form section');
  }

  addQuestion(){
    console.log('add question');
  }

  saveAsDraft() {
    console.log('save as draft');
  }

  publishForm() {
    console.log('publish the form');
  }

  ngOnDestroy(){
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
