// cart-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { AuthenticationService } from '../services/authentication.service';
import { Order } from '../models/order';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  isAuthenticated: boolean = false;

  constructor(
    public cartService: CartService,
    private router: Router,
    private orderService: OrderService,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.calculateTotalAmount();
    });
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.cartItems.reduce((total, cartItem) => {
      const price = Number(cartItem.product.price) || 0;
      return total + price * cartItem.quantity;
    }, 0);
  }

  checkout(): void {
    if (this.isAuthenticated) {
      // If authenticated, proceed with placing the order
      const orderDetails: Order = {
        id: 'generatedOrderId',
        customerDetails: this.authService.getAuthenticatedUser(),
        cartItems: this.cartService.getCartItems(),
        totalAmount: this.totalAmount,
      };

      this.orderService.placeOrder(orderDetails).subscribe(
        (order) => {
          console.log('Order placed successfully:', order);
          this.router.navigate(['/order-details', order.id]);
        },
        (error) => {
          console.error('Error placing order:', error);
        }
      );
    } else {
      // If not authenticated, show alert and redirect to login
      alert('You need to login first.');
      
      // Redirect to login page with returnUrl
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/dashboard' } });
    }
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
  
  removeFromCart(cartItem: any): void {
    this.cartService.removeFromCart(cartItem.product);
  }
  
  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToLogin(): void {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.route.snapshot.url.join('/') } });
  }

  // Add a method to get product details
  getProductDetails(product: any): string {
    // Customize this method based on your product data structure
    return `${product.name} - $${product.price}`;
  }
}
