import { MenuItem } from 'primeng/primeng';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuItems : MenuItem[] = [
    {
      routerLink:['/raspunsuri/urgente'],
      label: 'Urgente',
      disabled: false,
    }, {
      routerLink:['/raspunsuri'],
      label: 'Raspunsuri',
      disabled: false,
    }, {
      routerLink:['/statistici'],
      label: 'Statistici',
      disabled: false,
    }, {
      routerLink:['/ghidul-observatorului'],
      label: 'Ghidul observatorului',
      disabled: false,
    }
  ];

  ngOnInit() {

  }

}
