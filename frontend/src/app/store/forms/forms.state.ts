import { getRequestState, RequestState } from '../shared/request.state';
import { Form } from '../../models/form.model';
export interface FormsState {
    data: {
        A: Form,
        B: Form,
        C: Form
    },
    request: RequestState
}

export let formsInitialState: FormsState = {
    data: undefined,

    request: getRequestState()
}
