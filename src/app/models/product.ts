// product.model.ts
export interface Product {
    id: number;
    name: string;
    category: string;
    imageUrl: string;
    price: number;
    description: string;
    quantity: number;
    showQuantityButtons?: boolean; 
  }