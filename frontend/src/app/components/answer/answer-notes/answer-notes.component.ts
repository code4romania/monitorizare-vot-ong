import { AnswersService } from '../../../services/answers.service';
import { Note } from '../../../models/note.model';

import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-answer-notes',
  templateUrl: './answer-notes.component.html',
  styleUrls: ['./answer-notes.component.scss']
})
export class AnswerNotesComponent implements OnInit {

  notes: Observable<Note[]>;


  @Input() idObservator: number;
  @Input() idSectie: number;

  constructor(private answersService: AnswersService) { }

  ngOnInit() {
    this.notes = this.answersService.getNotes(this.idObservator, this.idSectie)

  }

}
