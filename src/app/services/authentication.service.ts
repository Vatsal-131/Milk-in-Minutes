import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  private authenticatedCustomerId: number | null = null;
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient, private router: Router) {}

  login(fname: string, password: string): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/login`, { fname, password }).pipe(
      map((user) => {
        this.isAuthenticatedSubject.next(true);
        this.authenticatedCustomerId = user?.id || null;
        return user;
      }),
      catchError((error) => {
        console.error('Authentication failed:', error);
        this.isAuthenticatedSubject.next(false);
        this.authenticatedCustomerId = null;
        return throwError(error);
      })
    );
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    this.authenticatedCustomerId = null;
    this.router.navigate(['/']);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getAuthenticatedCustomerId(): number | null {
    return this.authenticatedCustomerId;
  }

  getAuthenticatedUser(): Observable<Customer | null> {
    const authenticatedCustomerId = this.getAuthenticatedCustomerId();
    if (authenticatedCustomerId) {
      return this.http.get<Customer>(`${this.apiUrl}/customers/${authenticatedCustomerId}`).pipe(
        catchError((error) => {
          console.error('Error fetching authenticated user:', error);
          return of(null);
        })
      );
    } else {
      return of(null);
    }
  }
}
