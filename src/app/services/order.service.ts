// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3003/orders';
  
  constructor(private http: HttpClient) {}

  getOrderDetails(orderId: string): Observable<Order> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.get<Order>(url).pipe(
      tap((response) => console.log('Order details response:', response))
    );
  }

  placeOrder(orderDetails: Order): Observable<Order> {
    const url = `${this.apiUrl}/placeOrder`; // Adjust the URL based on your backend
    // Assuming you have a method to place an order on the server, update this accordingly
    return this.http.post<Order>(url, orderDetails).pipe(
      tap((order) => console.log('Order placed successfully:', order))
    );
  }
  // You can add other methods related to orders as needed
}
