import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import {FormsService} from '../../../services/forms.service';
import {Form} from '../../../models/form.model';
import {Location} from '@angular/common';
import {FormSection} from '../../../models/form.section.model';
import {BaseAnswer} from '../../../models/base.answer.model';
import {SectionComponent} from '../section/section.component';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss']
})
export class FormCreateComponent implements OnInit {
  title: string;
  form: Form;
  @ViewChild('section', {read: ViewContainerRef}) section: ViewContainerRef;

  showSection: boolean;
  showOptions: boolean;
  currentSection: FormSection;

  constructor(private formsService: FormsService,
              private location: Location,
              private router: Router,
              private cfr: ComponentFactoryResolver) { }

  ngOnInit() {
    this.title = 'Adauga formular nou';
    this.form = new Form();
    this.form.description = '';
  }

  public async openSectionPage(): Promise<void> {
    this.formsService.form = this.form;
  }

  public onBackPressed() {
    this.location.back();
  }


  addFormSection() {
    this.showOptions = false;
    this.showSection = true;
    if (!this.form.formSections) {
      this.form.formSections = [];
    }
    this.form.formSections.push(new FormSection());
    this.currentSection = this.form.formSections[this.form.formSections.length - 1];
    this.loadSectionComponent(this.currentSection);
  }

  private prepareForm(): boolean {
    if (!this.form.formSections || this.form.formSections.length <= 0) {
      alert('Formularul trebuie sa contina cel putin o sectiune.');
      return false;
    }

    return true;
  }

  saveForm() {
    const isReady = this.prepareForm();
    if (!isReady) {
      return ;
    }
    this.formsService.saveForm(this.form).subscribe((result) => {
      console.log(result);
      this.router.navigate(['/formulare']).then(r => {});
    });
  }

  saveAndPublishForm() {
    const isReady = this.prepareForm();
    if (!isReady) {
      return ;
    }
    this.formsService.saveAndPublishForm(this.form).subscribe((result) => {
      console.log(result);
      this.router.navigate(['/formulare']).then(r => {});
    });
  }

  async loadSectionComponent(section: FormSection) {
    const component: any = SectionComponent;

    const comp = this.section.createComponent(this.cfr.resolveComponentFactory<SectionComponent>(component));

    comp.instance.section = section;
    comp.instance.sectionDeleteEventEmitter.subscribe(_ => {
      this.onSectionDelete(section);
      comp.destroy();
    });

    return comp;
  }

  onSectionDelete(deletedSection: FormSection) {
    this.form.formSections = this.form.formSections.filter(s => s !== deletedSection);
  }
}
