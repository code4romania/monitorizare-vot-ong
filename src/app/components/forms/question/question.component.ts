import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QUESTION_TYPES, QuestionType} from '../../../models/form.question.model';
import {BaseAnswer} from '../../../models/base.answer.model';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {initOptionFormGroup} from '../form-groups-builder';
import {moveItemInFormArray} from '../../utils';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {
  hideOptions = false;

  @Input() questionFormGroup: FormGroup;
  @Output() questionDeleteEventEmitter = new EventEmitter<any>();

  questionTypes: QuestionType[];

  constructor(private formBuilder: FormBuilder) {}


  ngOnInit() {
    this.questionTypes = QUESTION_TYPES;
  }

  get optionsArray(): FormArray {
    return this.questionFormGroup.controls.optionsToQuestions as FormArray;
  }

  get optionFormGroupsArray(): FormGroup[] {
    return this.optionsArray.controls as FormGroup[];
  }

  addOption() {
    this.optionsArray.push(initOptionFormGroup(this.formBuilder));
  }

  toggleOptions() {
    this.hideOptions = !this.hideOptions;
  }

  onOptionDelete(index: number) {
    this.optionsArray.removeAt(index);
  }

  onReorder(event: CdkDragDrop<BaseAnswer[]>) {
    moveItemInFormArray(this.optionsArray, event.previousIndex, event.currentIndex);
  }
}
