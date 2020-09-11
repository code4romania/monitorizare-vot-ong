import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {Form} from '../../../models/form.model';
import {Location} from '@angular/common';
import {FormSection} from '../../../models/form.section.model';
import {SectionComponent} from '../section/section.component';
import {AppState} from '../../../store/store.module';
import {Store} from '@ngrx/store';
import {FormUploadAction} from '../../../store/form/form.actions';

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

  constructor(private location: Location,
              private router: Router,
              private cfr: ComponentFactoryResolver,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.title = 'Adauga formular nou';
    this.form = new Form();
    this.form.description = '';
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

    this.store.dispatch(new FormUploadAction(this.form));
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
