export interface Product {
  productName: string;
  productImage: string;
  productPrice: number;
  productDiscountPrice: number;
  productDescription: string;
  productCategory: string;
  id: string;
  featuredProduct: true;
}
export interface Item {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  vendor: {
    id: string;
    name: string;
    email: string;
    contactNumber: string;
    address: string;
  };
  image: string;
}

// Product.ts or an appropriate file
export interface CartItem {
  _id: string;
  quantity: number;
  price: number; 
  name: string
  image: string
}

// Define the structure of cart data
export interface CartData {
  cartItems: CartItem[];
}

export interface ApiResponse {
  message: string;
  products: Item[];
}
export interface ApiResponseProduct {
  message: string;
  product: Item;
}

export interface ProductDisplay {
  image: string;
  name: string;
}

export interface Vendor {
  _id: string; 
  name: string; 
  email: string; 
  contactNumber: string; 
  address: string; 
 
}

