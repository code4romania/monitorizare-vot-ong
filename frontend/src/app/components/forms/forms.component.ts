import {Component, OnInit} from '@angular/core';
import {FormDetails} from '../../models/form.info.model';
import {FormsService} from '../../services/forms.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  formsList: FormDetails[];
  pageSize = 10;
  totalCount = 0;
  page = 1;

  constructor(private formsService: FormsService, private router: Router) { }

  ngOnInit() {
    this.loadForms(1, this.pageSize);
  }

  private loadForms(pageNo: number, pageSize: number) {
    this.formsService.searchForms('', pageNo, pageSize).subscribe((result) => {
      this.formsList = result.formVersions;
      console.log(this.formsList);
      this.totalCount = this.formsList.length;
    });
  }

  public search(value: string) {
    this.formsService.searchForms(value, this.page, this.pageSize).subscribe((result) => {
      this.formsList = result.formVersions;
      this.totalCount = this.formsList.length;
    });
  }

  pageChanged(event) {
    if (event.page && event.pageSize) {
      this.page = event.page;
      this.pageSize = event.pageSize;
    }
    this.loadForms(this.page, this.pageSize);
  }

  public async formSelected(form: FormDetails): Promise<void> {
    console.log(form);
    this.formsService.selectedForm = form;
  }

  public async addForm(): Promise<void> {
    this.formsService.selectedForm = null;
  }

}
