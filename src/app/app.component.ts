import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public languages: string[] = ['en', 'ro'];
  public langIndex = 0;
  constructor(translate: TranslateService) {
    const lang = localStorage.getItem('language');
    if (lang) {
      this.langIndex = this.languages.findIndex((x) => x === lang);
    } else {
      localStorage.setItem('language', 'en');
    }
    translate.setDefaultLang(lang || 'en');
    translate.use(lang || 'en');
  }
}
