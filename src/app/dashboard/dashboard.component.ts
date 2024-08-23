// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CustomerService } from '../services/customers.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  customer: any; // Assuming you have a Customer model or interface

  constructor(
    private authService: AuthenticationService,
    private customerService: CustomerService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Fetch the currently logged-in customer's information
    this.customerService.getLoggedInCustomer().subscribe(
      (customer) => {
        this.customer = customer;
        console.log('Logged-in customer:', customer);

        // You can add additional logic here if needed

      },
      (error) => {
        console.error('Error fetching customer profile:', error);
        // Handle error as needed
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
