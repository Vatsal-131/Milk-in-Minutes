import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Milk-in-Minutes';
  isDashboardRoute: boolean = false;
  orderRoute: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is the dashboard route
        this.isDashboardRoute = event.url.includes('/dashboard');
        
        // Check if the current route is the order route
        this.orderRoute = event.url.includes('/order');
      }
    });
  }
}
