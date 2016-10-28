import { MdTabGroup } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuItems = [
    {
      link: '/raspunsuri/urgente',
      label: 'Urgente',
      active: false,
      isUrgent: true
    }, {
      link: '/raspunsuri',
      label: 'Raspunsuri',
      active: false
    }, {
      link: '/statistici',
      label: 'Statistici',
      active: false
    }, {
      link: '/ghidul-observatorului',
      label: 'Ghidul observatorului',
      active: false
    }
  ];

  ngOnInit() {

  }

}
