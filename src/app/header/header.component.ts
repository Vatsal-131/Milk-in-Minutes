// app-header.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Customer } from '../models/customer';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authenticatedUser: Customer | null = null;
  hometooltip='Login';
  carttooltip='MyCart';

  constructor(private authService: AuthenticationService,
    public cartService: CartService) {}

  ngOnInit(): void {
    this.authService.getAuthenticatedUser().subscribe(
      (user) => {
        this.authenticatedUser = user;
      },
      (error) => {
        console.error('Error fetching authenticated user:', error);
      }
    );
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticatedUser();
  }

  getUsername(): string | null {
    return this.authenticatedUser ? this.authenticatedUser.fname : null;
  }

  logout(): void {
    this.authService.logout();
  }
}
