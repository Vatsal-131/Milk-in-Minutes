export interface Customer {
    id?: number; // Optional if your API assigns IDs
    fname: string;
    lname: string;
    email: string;
    phone: string;
    password: string;
    // Add any other properties your customer might have
  }