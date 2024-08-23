// home.component.ts
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { CartService } from '../services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: any[] = [];
  food: any | null = null;

  constructor(
    private homeService: HomeService,
    private cartService: CartService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Fetching data...');

    this.homeService.getAllFromJson().subscribe(
      (data: any[]) => {
        if (Array.isArray(data)) {
          console.log('Fetched data:', data);
          this.foods = data;
        } else {
          console.error('Unexpected data format:', data);
          this.handleFetchError();
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.handleFetchError();
      }
    );

    this.homeService.selectedTag$.subscribe((tag) => {
      if (tag) {
        console.log('Received selected tag:', tag);
        this.homeService.getallfoodByTag(tag).subscribe(
          (filteredProducts: any[]) => {
            this.foods = filteredProducts;
          },
          (error) => {
            console.error('Error filtering by tag:', error);
            // Handle error as needed
          }
        );
      } else {
        // If no tag is selected, get all products
        this.homeService.getProducts().subscribe(
          (allProducts) => {
            this.foods = allProducts;
          },
          (error) => {
            console.error('Error fetching all products:', error);
            // Handle error as needed
          }
        );
      }
    });
  }

  addToCart(food: any): void {
    console.log('Adding to cart:', food);
    this.cartService.addToCart(food);
  }

  changeQuantity(food: any, amount: number): void {
    if (food.hasOwnProperty('quantity')) {
      food.quantity += amount;
      food.quantity = Math.max(1, food.quantity);
    } else {
      food.quantity = 1;
    }
  }

  private handleFetchError(): void {
    // Handle the unexpected format or error
    this.foods = []; // Set foods to an empty array or handle it as needed
  }
}
