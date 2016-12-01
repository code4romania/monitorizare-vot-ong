import { AvailableAnswers } from './available-answer.model';
export class Question {
    idIntrebare: number;
    textIntrebare: string;
    idTipIntrebare: number;
    raspunsuriDisponibile: AvailableAnswers[];
}