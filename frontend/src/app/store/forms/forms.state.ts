import { Form } from '../../models/form.model';
import { getRequestState, RequestState } from '../shared/request.state';
export interface FormsState {
    data: {
        A: Form,
        B: Form,
        C: Form
    },
    request: RequestState
}

let defaultRequestState = getRequestState();
export let formsInitialState: FormsState = {
    data: undefined,

    request: defaultRequestState
}
