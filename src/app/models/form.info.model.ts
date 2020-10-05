export interface FormInfo {
    formVersions: FormDetails[];
}

export interface FormDetails {
    id: number;
    code: string;
    description: string;
    currentVersion: number;
    diaspora: boolean;
    draft: boolean;
}
