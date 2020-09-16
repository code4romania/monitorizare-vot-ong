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
}
