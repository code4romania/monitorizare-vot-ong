import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public languages: string[] = ['en', 'ro'];
  public langIndex: number = 0;

  constructor(translate: TranslateService) {
    const lang = localStorage.getItem('language');
    console.log('xx', lang);
    if (lang) {
      this.langIndex = this.languages.findIndex(x => x === lang);
    } else {
      localStorage.setItem('language', 'en');
    }
    translate.setDefaultLang(lang || 'en');
    translate.use(lang || 'en');
  }
}
