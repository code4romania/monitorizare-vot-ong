import 'rxjs/Rx';
import { Component, NgZone } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public languages: string[] = ['en', 'ro'];
  public langIndex: number = 0;
  constructor(translate: TranslateService, zone: NgZone) {
    const lang = localStorage.getItem('language');
    if (lang) {
      this.langIndex = this.languages.findIndex(x => x === lang);
    } else {
      localStorage.setItem('language', 'en')
    }
    translate.setDefaultLang(lang || 'en');
    translate.use(lang || 'en');
  }
}
