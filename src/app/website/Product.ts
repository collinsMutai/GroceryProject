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
  id: string;
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
  itemId: string;
  quantity: number;
  price: number; // Price per unit of the item
}

// Define the structure of cart data
export interface CartData {
  cartItems: CartItem[];
  subtotal: number;
  totalQuantity: number;
}

export interface ApiResponse {
  message: string;
  products: Item[];
}

export interface ProductDisplay {
  image: string;
  name: string;
}
