import { AvailableAnswers } from './available-answer.model';
export class Question {
    idIntrebare: number;
    codIntrebare: string;
    textIntrebare: string;
    idTipIntrebare: number;
    raspunsuriDisponibile: AvailableAnswers[];
}