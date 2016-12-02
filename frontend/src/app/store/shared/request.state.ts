export class RequestState {
    loading: boolean
    error: boolean
    reason: any
}

export const getRequestState = (loading = false, error = false): RequestState => {

    let reason = undefined;

    if (typeof error !== 'boolean') {
        reason = error;
        error = true;
    }
    return {
        loading: false,
        error: false,
        reason: reason
    }
}