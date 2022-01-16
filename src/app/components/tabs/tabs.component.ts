import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  currentRoute: string = '';
  showAllTabs = true;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe(
      {
        next:(event) => {
          if (event instanceof NavigationStart) {
            this.showAllTabs = this.currentRoute !== '/login' && this.currentRoute !== '/password/forgot' ? true : false;
          }
          if (event instanceof NavigationEnd) {
            this.currentRoute = event.url;
            this.showAllTabs = this.currentRoute !== '/login' && this.currentRoute !== '/password/forgot' ? true : false;
          }
        }
      }
    )
  }

  ngOnInit(): void {
  }

}
