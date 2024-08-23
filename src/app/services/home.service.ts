// home.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'http://localhost:3000/products';
  private products: any[] = [];
  private selectedTagSubject = new Subject<string>();
  selectedTag$ = this.selectedTagSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllFromJson(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data: any) => {
        let products = data;

        if (data && Array.isArray(data)) {
          products = data.map((food: any) => ({ ...food, showQuantityButtons: true }));
        } else {
          // Handle the unexpected format
          console.error('Unexpected data format:', data);
        }

        this.products = products;
        return products;
      }),
      catchError(this.handleError)
    );
  }

  getProducts(): Observable<any[]> {
    if (this.products.length === 0) {
      return this.getAllFromJson();
    } else {
      return new Observable((observer) => {
        observer.next(this.products);
        observer.complete();
      });
    }
  }

  getFoodById(id: number): Observable<any> {
    return this.getAllFromJson().pipe(
      map((products: any[]) => products.find((food: any) => food.id === id))
    );
  }

  getallfoodByTag(tag: string): Observable<any[]> {
    return this.getAllFromJson().pipe(
      map((products: any[]) => products.filter((product) => product.tags?.includes(tag)))
    );
  }

  getUniqueTags(): Observable<string[]> {
    return this.getAllFromJson().pipe(
      map((products) => {
        const allTags: string[] = products.reduce(
          (tags, product) => (product.tags ? tags.concat(product.tags) : tags),
          []
        );

        return Array.from(new Set(allTags));
      })
    );
  }

  setSelectedTag(tag: string): void {
    this.selectedTagSubject.next(tag);
  }

  // Other methods in your service...

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError('Something went wrong. Please try again later.');
  }
}
