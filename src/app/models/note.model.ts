export class Note {
    countyCode: string;
    pollingStattionNumber: number;
    attachmentsPaths: ({ src: string; isImage: boolean, type?: string; })[];
    text: string;
    formCode: string;
    formId: number;
    questionId: number;
}
