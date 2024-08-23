import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CustomerService } from '../services/customers.service';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboardheader',
  templateUrl: './dashboardheader.component.html',
  styleUrls: ['./dashboardheader.component.css']
})
export class DashboardheaderComponent implements OnInit {
  isAuthenticated: any;
  customer: any;
  totalAmount: any;

  constructor(
    private authService: AuthenticationService,
    private customerService: CustomerService,
    public cartService: CartService,
    public orderService: OrderService,
    private router:Router
  ) {}
  
  
  

  ngOnInit(): void {
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

    // Subscribe to changes in cart items
    this.cartService.cartItems$.subscribe((cartItems) => {
      console.log('Cart items:', cartItems);
    });
  }

  logout() {
    this.authService.logout();
  }

  addToCart(product: any): void {
    // Assuming you have a method to add a product to the cart in your CartService
    this.cartService.addToCart(product);
    console.log('Cart Items after adding:', this.cartService.getCartItems());
    // Optionally, you can update other components or perform additional actions after adding to the cart
  }
}
