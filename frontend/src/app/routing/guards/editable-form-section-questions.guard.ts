import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/store.module';
import {EditableFormsLoadAllOptionsAction} from '../../store/editable-forms/editable.forms.actions';

@Injectable()
export class EditableFormSectionQuestionsGuard implements CanActivate{
  constructor(private store: Store<AppState>) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new EditableFormsLoadAllOptionsAction());
    return true;
  }
}
