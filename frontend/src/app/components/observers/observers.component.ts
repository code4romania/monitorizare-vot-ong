import {ObserversStateItem} from '../../store/observers/observers.state';
import {AppState} from '../../store/store.module';
import {Store} from '@ngrx/store';
import {ApiService} from '../../core/apiService/api.service';
import {Subscription} from 'rxjs/Rx';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DeleteObserverAction, LoadObserversAction} from '../../store/observers/observers.actions';
import {values} from 'lodash';
import {map} from 'rxjs/operators';
import {Observer} from '../../models/observer.model';
import {ListType} from '../../models/list.type.model';
import {ObserversFilterForm} from './observers-filter.form';
import {ObserversService} from '../../services/observers.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-observers',
  templateUrl: './observers.component.html',
  styleUrls: ['./observers.component.scss']
})
export class ObserversComponent implements OnInit, OnDestroy {
  observersState: ObserversStateItem;
  observersSubscription: Subscription;
  observersList: Array<Observer>;
  listType: ListType = ListType.CARD;
  observersFilterForm: ObserversFilterForm;
  selectedObserversIds: Array<string> = [];

  anyObservers = false;
  pageSize = 9;

  constructor(private http: ApiService, private store: Store<AppState>, private observersService: ObserversService, private toastrService: ToastrService) {
    this.observersFilterForm = new ObserversFilterForm();
  }

  ngOnInit() {
    this.loadObservers(1);
    this.handleObserversData();
  }

  changeListType(type: string) {
    this.listType = type as ListType;
  }


  pageChanged(event) {
    this.loadObservers(event.pageNo);
  }

  applyFilters() {
    this.loadObservers(1);
  }

  resetFilters() {
    this.observersFilterForm.reset({name: '', phone: ''});
    this.loadObservers(1);
  }

  private loadObservers(pageNo) {
    this.store
      .select(s => s.observers)
      .take(1)
      .map(data => values(data))
      .concatMap(s => Observable.from(s))
      .map((storeItem: ObserversStateItem) => new LoadObserversAction(storeItem.key, pageNo, 5, true, this.observersFilterForm.get('name').value, this.observersFilterForm.get('phone').value))
      .subscribe(action => this.store.dispatch(action));
  }

  private handleObserversData() {
    this.observersSubscription = this.store
      .select(state => state.observers)
      .pipe(map(state => values(state)), map(state => state[0]))
      .subscribe(state => {
        this.observersState = state;
        this.observersList = state.values;
        this.anyObservers = state.values.length > 0;
      })
  }

  onObserverSelect(selectedObserver: Partial<Observer>){
    if(selectedObserver.isSelected) {
      this.selectedObserversIds.push(selectedObserver.id);
    }
    else {
      const index = this.selectedObserversIds.findIndex((observerId) => observerId === selectedObserver.id);
      this.selectedObserversIds.splice(index, 1);
    }
  }

  onObserverDelete(observer: Observer){
    this.observersService.deleteObserver(observer.id).subscribe((data)=> {
      this.loadObservers(1);
      this.toastrService.warning("Success!", 'User has been removed');
    })
  }

  onObserverResetPassword(observer: Observer){

  }


  ngOnDestroy() {
    this.observersSubscription.unsubscribe();
  }

}
