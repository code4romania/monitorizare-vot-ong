import { BaseQuestion } from '../../../models/base.question.model';
import { Note } from '../../../models/note.model';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer-note',
  templateUrl: './answer-note.component.html',
  styleUrls: ['./answer-note.component.scss']
})
export class AnswerNoteComponent implements OnInit {

  @Input()
  note: Note;

  @Input()
  question: BaseQuestion;


  get canShow(){
    return this.note && this.question;
  }



  constructor() { }

  ngOnInit() {

  }

}
