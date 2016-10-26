import { Component, OnInit } from '@angular/core';
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

  selectedIndex: number;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveTab();
      }
    })
  }

  onTabSelectedChange(event){
    var tab = this.menuItems[event.index];

    if(!this.router.isActive(tab.link,true)){
      this.router.navigateByUrl(tab.link);
    }
  }

  updateActiveTab() {
    this.menuItems.forEach((menuItem, index) => {
      if(this.router.isActive(menuItem.link, true)){
        this.selectedIndex = index;
      }
    });
  }

}
