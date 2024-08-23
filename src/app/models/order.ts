export interface Order {
    id: string;
    customerDetails: any; // Define the structure of customer details accordingly
    cartItems: any[]; // Define the structure of cart items accordingly
    totalAmount: number;
    // Add any other properties you need for your order details
  }