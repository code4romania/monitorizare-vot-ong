import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Note } from 'src/app/models/note.model';
import { LoadNotesAction } from 'src/app/store/note/note.actions';
import { DisplayedNote } from '../answers.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent implements OnInit {
  @Input() notes: DisplayedNote[] = [];

  columns = [
    { name: 'Form&Question', },
    { name: 'Red Flag', propertyName: 'isQuestionFlagged', },
    { name: 'Note', propertyName: 'text' },
  ]

  ngOnInit(): void {
  }
}
