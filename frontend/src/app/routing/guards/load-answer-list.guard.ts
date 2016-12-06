import { LoadAnswerPreviewAction } from '../../store/answer/answer.actions';
import { AppState } from '../../store/store.module';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AnswerListGuard implements CanActivate {
    constructor(private store: Store<AppState>) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.dispatch(new LoadAnswerPreviewAction(route.queryParams['urgent'],1,5,true));
        return true;
    }
}