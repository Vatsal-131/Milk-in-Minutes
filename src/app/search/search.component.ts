// search.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Input() redirectToMain: boolean = false;
  searchItem: string = '';
  products: any[] = [];
  filteredProducts: any[] = [];  
  productsFound: boolean = true;  // Introduce this variable

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['searchItem']) {
        this.searchItem = params['searchItem'];
        this.search();
      }
    });
  }
  
  addToCart(food: any): void {
    console.log('Adding to cart:', food);
    this.cartService.addToCart(food);
    this.router.navigateByUrl('/cart-page');
  }

  search(): void {
    console.log('Search called with:', this.searchItem);

    // Check if searchItem is empty before making the API call
    if (this.searchItem.trim() === '') {
      console.log('Search term is empty');
      this.router.navigate(['/']);

      // Check if redirectToMain is true before navigating
      if (this.redirectToMain) {
        console.log('Redirecting to main page');
        this.router.navigate(['/']);
      }

      return;
    }

    this.homeService.getProducts().subscribe(
      (result: any) => {
        console.log('API Response:', result);
        this.products = result;
        this.filteredProducts = this.filterProducts();

        // Update productsFound based on whether there are filtered products or not
        this.productsFound = this.filteredProducts.length > 0;

        // Check if redirectToMain is true before navigating
        if (this.redirectToMain) {
          console.log('Redirecting to search page');
          this.router.navigate(['search', this.searchItem]);
        }
      },
      (error) => {
        console.error('Error fetching search results:', error);
        this.products = [];
        this.filteredProducts = [];
        this.productsFound = false;  // Set to false in case of an error
      }
    );
  }
  

  private filterProducts(): any[] {
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchItem.toLowerCase())
    );
  }
}
