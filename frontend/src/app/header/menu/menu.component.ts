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
      routerLink: '/raspunsuri/urgente',
      label: 'Urgente',
    }, {
      routerLink: '/raspunsuri',
      label: 'Raspunsuri',
    }, {
      routerLink: '/statistici',
      label: 'Statistici',
    }, {
      routerLink: '/ghidul-observatorului',
      label: 'Ghidul observatorului'
    }
  ];

  ngOnInit() {

  }

}
