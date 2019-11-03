import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-question-menu',
  templateUrl: './question-menu.component.html',
  styleUrls: ['./question-menu.component.scss']
})
export class QuestionMenuComponent implements OnInit {
  @Output() addQuestion = new EventEmitter();
  @Output() saveFormSection = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  addNewFormSection() {
    console.log('new form section');
  }

  addNewQuestion(){
    this.addQuestion.emit();
  }

  saveAsDraft() {
    console.log('save as draft');
    this.saveFormSection.emit();
  }

  publishForm() {
    console.log('publish the form');
    this.saveFormSection.emit();
  }

}
