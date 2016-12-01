import { RaspunsDisponibil } from './raspuns-disponibil.model';
export class Intrebare {
    idIntrebare: number;
    textIntrebare: string;
    idTipIntrebare: number;
    raspunsuriDisponibile: RaspunsDisponibil[];
}