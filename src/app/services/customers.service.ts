// customer.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs'; // Import catchError and other operators
import { Customer } from '../models/customer';
 
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:3002/customers';

  constructor(private http: HttpClient) {}

  authenticateCustomer(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((customers: { email: string; password: string; }[]) => {
        const isAuthenticated = customers.some((customer: { email: string; password: string; }) =>
          customer.email === username && customer.password === password
        );
        return isAuthenticated;
      })
    );
  }

  getCustomers(): Observable<Customer[]> {
    console.log('Fetching customers...');
    return this.http.get<Customer[]>(this.apiUrl);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  getLoggedInCustomer(): Observable<Customer | null> {
    // Replace this with your actual authentication logic
    // For now, we simulate authentication with a local API
    return this.http.get<Customer[]>(this.apiUrl)
      .pipe(
        map(customers => customers.length > 0 ? customers[0] : null),
        catchError(error => {
          console.error('Error fetching logged-in customer:', error);
          return of(null);
        })
      );
  }
}
