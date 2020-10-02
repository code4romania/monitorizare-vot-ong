import {Component, EventEmitter, Input, Output, } from '@angular/core';
import {FormQuestion} from '../../../models/form.question.model';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {moveItemInFormArray} from '../../utils';
import {initQuestionFormGroup} from '../form-groups-builder';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  @Input() sectionFormGroup: FormGroup;

  @Output() sectionDeleteEventEmitter = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
  }

  addQuestion() {
    this.questionsArray.push(initQuestionFormGroup(this.formBuilder));
  }

  get questionsArray(): FormArray {
    return this.sectionFormGroup.get('questions') as FormArray;
  }

  get questionFormGroupsArray(): FormGroup[] {
    return this.questionsArray.controls as FormGroup[];
  }

  onQuestionDelete(index: number) {
    this.questionsArray.removeAt(index);
  }

  onReorder(event: CdkDragDrop<FormQuestion[]>) {
    moveItemInFormArray(this.questionsArray, event.previousIndex, event.currentIndex);
  }
}
