import { ActionReducer, Action } from '@ngrx/store'

export const FORMS_LOAD = 'FORMS_LOAD'
export const FORMS_LOADED = 'FORMS_LOADED'

export const formsReducer: ActionReducer<any> = (state: any, action: Action) => {
    switch (action.type) {
        case FORMS_LOAD:
            return Object.assign({}, state, {
                forms: {
                    data: [],
                    loading: true,
                    error: false
                }
            })
        case FORMS_LOADED:
            return Object.assign({}, state, {
                forms: {
                    data: action.payload,
                    loading: false,
                    error: false
                }
            })
        default:
            return state
    }
}