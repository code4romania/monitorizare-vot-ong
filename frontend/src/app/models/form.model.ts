import { FormSection } from './form.section.model';
import {FormDetails} from './form.info.model';

export class Form implements FormDetails {
    id: number;
    formSections: FormSection[];
    description: string;
    code: string;
    diaspora: boolean;
    draft: boolean;
    currentVersion: number;

    public static fromMetaData(formDetails: FormDetails) {
      const result = new Form();
      result.inheritMetaData(formDetails);
      return result;
    }

    public inheritMetaData(formDetails: FormDetails) {
      this.id = formDetails.id;
      this.description = formDetails.description;
      this.code = formDetails.code;
      this.diaspora = formDetails.diaspora;
      this.currentVersion = formDetails.currentVersion;
      this.draft = formDetails.draft;
    }
}
