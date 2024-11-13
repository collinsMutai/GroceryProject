// Interface for Product
export interface Product {
  productName: string; // Name of the product
  productImage: string; // Image URL for the product
  productPrice: number; // Regular price of the product
  productDiscountPrice: number; // Discounted price of the product
  productDescription: string; // Description of the product
  productCategory: string; // Category name (e.g., "Vegetables")
  id: string; // Product ID
  featuredProduct: boolean; // Whether the product is featured (true or false)
}

// Interface for Item (flattened product data for cart and display purposes)
export interface Item {
  _id: string; // Item ID (should be a string)
  name: string; // Name of the item (same as productName)
  price: number; // Price of the item (same as productPrice)
  description: string; // Description of the item (same as productDescription)
  category: string; // Category of the item (same as productCategory)
  stock: number; // Stock of the item (usually assumed or fetched elsewhere)
  vendor?: Vendor; // Optional vendor details
  image: string; // Image URL of the product (same as productImage)
}

// Interface for Vendor details
export interface Vendor {
  _id: string; // Vendor ID (should be a string)
  name: string; // Vendor name
  email: string; // Vendor email
  contactNumber: string; // Vendor's contact number
  address: string; // Vendor's address
}

// Cart Item interface - Represents an item in the shopping cart
export interface CartItem {
  _id: string; // Item ID (should be a string)
  quantity: number; // Quantity of the item in the cart
  price: number; // Price of the item (for cart calculations)
  name?: string; // Optional item name (can be provided for custom display)
  image?: string; // Optional image URL (can be provided for custom display)
  vendor?: Vendor; // Optional vendor details
}

// Structure for Cart data (List of cart items)
export interface CartData {
  cartItems: CartItem[]; // List of cart items
}

// Response from the API when fetching all products
export interface ApiResponse {
  message: string; // Response message (e.g., success/failure message)
  products: Item[]; // List of products (as Item)
}

// Response from the API when fetching a single product
export interface ApiResponseProduct {
  message: string; // Response message
  product: Item; // Single product (as Item)
}

// Display interface for showing product image and name in UI
export interface ProductDisplay {
  image: string; // Product image URL
  name: string; // Product name
}

// Order request structure (used for checkout process)
export interface OrderRequest {
  items: CartItem[]; // List of items in the order
  customerDetails?: {
    // Optional customer details for guest checkout
    firstName: string; // Customer's first name
    lastName: string; // Customer's last name
    phone: string; // Customer's phone number
    email: string; // Customer's email address
    address: string; // Customer's address
    building?: string; // Optional building name/number
    city: string; // Customer's city
    county: string; // Customer's county
    instructions?: string; // Optional special instructions for the order
  };
  paymentMethod: string; // Payment method (e.g., "credit card", "paypal", etc.)
  customerId?: string; // Optional customer ID for registered users
  vendorId?: string; // Optional vendor ID (for vendor-specific orders)
}
