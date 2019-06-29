import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/store.module';
import {EditableFormsLoadAllAction} from '../../store/editable-forms/editable.forms.actions';

@Injectable()
export class EditableFormsGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new EditableFormsLoadAllAction());
    return true;
  }
}
