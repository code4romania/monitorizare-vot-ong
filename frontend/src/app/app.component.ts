import { Http } from '@angular/http';
import { Component } from '@angular/core';
import 'rxjs/Rx'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(http: Http) {
    http.get('/api/test');

  }
}
