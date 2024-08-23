import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  currentStep: number = 1;
  fname: any;
  lastName: any;
  address: any;
  city: any;
  zipCode: any;
  addressForm: any;
  totalAmount: any;
  cartItems: any;
  cartItem: any;
  orderPlacedSuccessfully: any;

  constructor(public cartService: CartService, private router: Router,private http:HttpClient ) {}

  calculateTotalAmount(): void {
    this.totalAmount = this.cartItems.reduce((total: number, cartItem: { product: { price: any; }; quantity: number; }) => {
      const price = Number(cartItem.product.price) || 0;
      return total + price * cartItem.quantity;
    }, 0);
  }

  increaseQuantity(cartItem: any): void {
    cartItem.quantity++;
    this.cartService.updateCartItem(cartItem);
    this.calculateTotalAmount();
  }
  
  decreaseQuantity(cartItem: any): void {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      this.cartService.updateCartItem(cartItem);
      this.calculateTotalAmount();
    }
  }

  goToNextStep() {
    this.currentStep++;
  }

  removeFromCart(cartItem: any): void {
    this.cartService.removeFromCart(cartItem.product);
  }

  placeOrder() {
    // Logic to place the order, e.g., calling a service method
    // After placing the order, move to the next step
    this.currentStep++;
  }

  continueShopping() {
    // Reset the order process and go back to the cart or products page
    // You might want to clear the cart or perform any other necessary actions
    this.currentStep = 1;
    this.router.navigate(['/dashboard']);
  }

  confirmOrder() {

    const orderData = {
      customerName: `${this.fname} ${this.lastName}`,
      address: `${this.address}, ${this.city}, ${this.zipCode}`,
      orderedProducts: this.cartService.getCartItems()
    };
  
    this.http.post('http://localhost:3003/orders', orderData).subscribe(
      (response) => {
        alert('Order placed successfully:');
        this.orderPlacedSuccessfully = true; 
        this.router.navigate(['/dashboard']);        
        this.cartService.clearCart();
        // Move to the next step
      },
      (error) => {
        console.error('Error placing order:', error);
        // Handle error if needed
      }
    );
  }
}

