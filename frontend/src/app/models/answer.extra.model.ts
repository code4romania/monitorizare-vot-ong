import * as _ from 'lodash';
export interface AnswerExtraConstructorData {
    dataUltimeiModificari: string
    esteZonaUrbana: boolean
    oraSosirii: string
    oraPlecarii: string
    presedinteBesvesteFemeie: boolean
}
export class AnswerExtra {
    dataUltimeiModificari: Date
    esteZonaUrbana = false
    oraSosirii: Date
    oraPlecarii: Date
    presedinteBesvesteFemeie = false

    constructor(formInfo?:AnswerExtraConstructorData){
        if(!formInfo){
            return;
        }
        checkForPropValue(formInfo.dataUltimeiModificari, val => this.dataUltimeiModificari = val);
        checkForPropValue(formInfo.oraSosirii, val => this.oraSosirii = val)
        checkForPropValue(formInfo.oraSosirii, val => this.oraSosirii = val)

        function checkForPropValue(value, setPropertyFn :(val:Date)=>void){
            if(!value){
                return;
            }
            if(_.isString(value)) {
                value = new Date(value)
            }
            
            if(_.isDate(value)){
                setPropertyFn(value)
            }
        }

    }
}