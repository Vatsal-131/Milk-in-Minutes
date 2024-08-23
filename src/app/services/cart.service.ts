import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { AuthenticationService } from '../services/authentication.service';

interface CartItem {
  price: number;
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  loadCartFromServer(customer: import("../models/customer").Customer | null) {
    throw new Error('Method not implemented.');
  }
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private authService: AuthenticationService) {}

  findCartItem(product: Product): CartItem | undefined {
    return this.cartItems.find((item) => item.product.id === product.id);
  }

  addToCart(product: any): void {
    const existingCartItem = this.findCartItem(product);
  
    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity + Number(product.quantity);
      existingCartItem.quantity = isNaN(newQuantity) ? 0 : newQuantity;
    } else {
      this.cartItems.push({
        product,
        quantity: isNaN(Number(product.quantity)) ? 1 : Number(product.quantity),
        price: product.price || 0,
      });
    }
  
    this.updateCartItems();
  }

  removeFromCart(product: Product): void {
    this.cartItems = this.cartItems.filter((item) => item.product.id !== product.id);
    this.updateCartItems();
  }

  updateCartItem(updatedItem: CartItem): void {
    const index = this.cartItems.findIndex((item) => item.product.id === updatedItem.product.id);

    if (index !== -1) {
      this.cartItems[index] = updatedItem;
      this.updateCartItems();
    }
  }

  private updateCartItems(): void {
    this.cartItemsSubject.next([...this.cartItems]);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getCartItemCount(): number {
  return this.cartItems.reduce((total, item) => {
    const itemQuantity = Number(item.quantity);
    return isNaN(itemQuantity) ? total : total + itemQuantity;
  }, 0);
}

clearCart(): void {
  this.cartItems = [];
  // Optionally, you can also update other properties or perform additional cleanup if needed.
}
}

