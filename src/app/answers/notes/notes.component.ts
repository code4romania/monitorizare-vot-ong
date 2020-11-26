import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';
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
  @Output() showNoteInModal = new EventEmitter();

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  columns = [
    { name: 'Form&Question', },
    { name: 'Red Flag', propertyName: 'isQuestionFlagged', },
    { name: 'Note', propertyName: 'text' },
  ];

  constructor (
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants
  ) { }

  ngOnInit(): void {
  }

  onQuestionLinkClicked (event: Event, note: DisplayedNote) {
    event.stopPropagation();
    this.questionLinkClicked.emit(note);
  }

  onRowClicked (note: DisplayedNote) {
    this.showNoteInModal.emit(note);
  }
}
