import { LoadAnswerDetailsAction} from '../../store/answer/answer.actions';
import { AppState } from '../../store/store.module';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AnswerDetailsGuard implements CanActivate {
    constructor(private store: Store<AppState>) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.dispatch(new LoadAnswerDetailsAction(route.params['idObserver'], route.params['idPollingStation']));
        return true;
    }
}
