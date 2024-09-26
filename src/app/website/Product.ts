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
  vendor?: {
    _id: string;
    name: string;
    email: string;
    contactNumber: string;
    address: string;
  };
  image: string;
}
export interface Vendor {
  _id: string;
  name: string;
  email: string;
  contactNumber: string;
  address: string;
}

export interface CartItem {
  _id: string;
  quantity: number;
  price: number;
  name?: string;
  image?: string;
  vendor?: Vendor;
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

export interface OrderRequest {
  items: CartItem[];
  customerDetails?: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    building?: string;
    city: string;
    county: string;
    instructions?: string;
  }; // Optional for guest checkout
  paymentMethod: string;
  customerId?: string; // Optional for guest checkout
  vendorId?: string;
}
