// signup.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customers.service';

@Component({
  selector: 'app-signup',
  templateUrl:'./Signup.component.html',
  styleUrls: ['./Signup.component.css']
})
export class SignupComponent implements OnInit {
  signup: FormGroup | any;

  constructor(private fb: FormBuilder, private customersService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.signup = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  signupdata() {
    if (this.signup.valid) {
      const password = this.signup.get('password').value;
      const confirmPassword = this.signup.get('confirmPassword').value;

      if (password === confirmPassword) {
        this.customersService.addCustomer(this.signup.value).subscribe(
          () => {
            alert('Successfully signed up!');
            this.router.navigate(['/login']);
          },
          (error: any) => {
            alert('Failed to sign up. Please try again.');
            console.error('Error during sign up:', error);
          }
        );
      } else {
        alert('Passwords do not match. Please check and try again.');
      }
    } else {
      alert('Please fill in all required fields with valid information.');
    }
  }
}
