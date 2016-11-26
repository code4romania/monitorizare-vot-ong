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
      routerLink:[''],
      label: 'Urgente',
    }, {
      routerLink:['/raspunsuri'],
      label: 'Raspunsuri',
    }, {
      routerLink:['/statistici'],
      label: 'Statistici',
    }, {
      routerLink:['/ghidul-observatorului'],
      label: 'Ghidul observatorului',
    }
  ];

}
