import { Component } from '@angular/core';
import 'rxjs/Rx'; 
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(store: Store<any>) {
    store.select((state) => state.forms)
    .distinctUntilChanged()
    .subscribe(console.log);

  }
}
