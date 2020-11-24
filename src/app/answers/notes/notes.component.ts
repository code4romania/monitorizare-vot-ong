import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Note } from 'src/app/models/note.model';
import { LoadNotesAction } from 'src/app/store/note/note.actions';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent implements OnInit {
  @Input() notes: Note[] = [];

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const { idObserver, idPollingStation } = this.activatedRoute.snapshot.params;

    this.store.dispatch(new LoadNotesAction(+idPollingStation, +idObserver));
  }
}
