import { Nota } from '../../models/nota.model';
import { Observable } from 'rxjs/Rx';
import { AnswersService } from '../../shared/answers.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer-notes',
  templateUrl: './answer-notes.component.html',
  styleUrls: ['./answer-notes.component.scss']
})
export class AnswerNotesComponent implements OnInit {

  notes: Observable<Nota[]>;


  @Input() idObservator: number;
  @Input() idSectie: number;

  constructor(private answersService: AnswersService) { }

  ngOnInit() {
    this.notes = this.answersService.getNotes(this.idObservator, this.idSectie)

  }

}
