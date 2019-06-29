import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/store.module';
import {EditableFormsLoadByIdAction} from '../../store/editable-forms/editable.forms.actions';
import {Injectable} from '@angular/core';

@Injectable()
export class EditableFormSectionsGuard implements CanActivate{
  constructor(private store: Store<AppState>) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new EditableFormsLoadByIdAction(route.params.id));
    return true;
  }
}
