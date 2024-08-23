// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login!: FormGroup; 

  constructor(private customersService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.login = new FormGroup({
      'fname': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    });
  }

  logindata(): void {
    const { fname, password } = this.login.value;

    if (!fname || !password) {
      alert('Please fill in both username and password fields.');
      return;
    }

    this.customersService.authenticateCustomer(fname, password).subscribe(
      (authenticatedCustomer) => {
        if (authenticatedCustomer) {
          alert('Successfully logged in!');
          // You can store the authenticated customer data in a service or local storage
          // and use it throughout your application.
          // Example: this.authService.setAuthenticatedCustomer(authenticatedCustomer);
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid username or password. Please sign up first.');
        }
      },
      (error) => {
        console.error('Error during login:', error);
        alert('Failed to log in. Please try again.');
      }
    );
  }
}
