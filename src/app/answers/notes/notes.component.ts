import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
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

  @Output() questionLinkClicked = new EventEmitter<DisplayedNote>();

  columns = [
    { name: 'Form&Question', },
    { name: 'Red Flag', propertyName: 'isQuestionFlagged', },
    { name: 'Note', propertyName: 'text' },
  ]

  ngOnInit(): void {
  }

  onQuestionLinkClicked (event: Event, note: DisplayedNote) {
    event.stopPropagation();
    this.questionLinkClicked.emit(note);
  }
}
