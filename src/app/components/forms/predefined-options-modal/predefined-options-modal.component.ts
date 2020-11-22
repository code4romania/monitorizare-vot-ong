import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import predefinedOptions from '../../../../assets/configs/predefined-options.json';

interface Category {
  label: string;
  options: Option[];
}

interface Option {
  label: string;
  check?: boolean;
}

@Component({
  selector: 'app-predefined-options-modal',
  templateUrl: './predefined-options-modal.component.html',
  styleUrls: ['./predefined-options-modal.component.scss']
})
export class PredefinedOptionsModalComponent implements OnInit {
  data: Category[];
  private readonly checkboxPersistentData: any;

  constructor(public modal: NgbActiveModal) {
    if (!localStorage.getItem('selectedPredefinedOptions')) {
      localStorage.setItem('selectedPredefinedOptions', '{}');
    }
    try {
      this.checkboxPersistentData = JSON.parse(localStorage.getItem('selectedPredefinedOptions'));
    } catch {
      localStorage.setItem('selectedPredefinedOptions', '{}');
      this.checkboxPersistentData = {};
    }

    this.data = predefinedOptions;

    this.data.forEach(category => {
      category.options.forEach(option => {
        if (option.label in this.checkboxPersistentData)
          this.check(option, this.checkboxPersistentData[option.label] === 'true')
      })
    })
  }

  check(option: Option, value: boolean) {
    option.check = value;
    this.checkboxPersistentData[option.label] = value ? 'true' : 'false';
    localStorage.setItem('selectedPredefinedOptions', JSON.stringify(this.checkboxPersistentData));
  }

  getChecked() {
    const result = []
    this.data.forEach(category => {
      category.options.forEach(option => {
        if (option.check)
          result.push(option.label)
      })
    })
    return result;
  }

  ngOnInit() {
  }
}


