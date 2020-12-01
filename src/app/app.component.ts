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
      localStorage.setItem('language', 'ro');
    }
    translate.addLangs(this.languages);
    translate.setDefaultLang(lang || 'ro');
    translate.use(lang || 'ro');
  }
}
