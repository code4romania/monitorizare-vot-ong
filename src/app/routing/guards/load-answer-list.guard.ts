
import {map, take} from 'rxjs/operators';
import { LoadAnswerPreviewAction } from '../../store/answer/answer.actions';
import { AppState } from '../../store/store.module';
import {select, Store} from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AnswerListGuard implements CanActivate {
    constructor(private store: Store<AppState>) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


        return true;
    }
}
