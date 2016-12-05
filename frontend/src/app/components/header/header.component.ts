import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  menuItems : any[] = [
    {
      state: 'home',
      params: { urgente: true},
      label: 'Urgente',
    }, {
      state: 'raspunsuri',
      label: 'Raspunsuri',
    }, {
      state: 'statistics',
      label: 'Statistici',
    }, {
      state: 'ghidul-observatorului',
      label: 'Ghidul observatorului',
    }
  ];

}
