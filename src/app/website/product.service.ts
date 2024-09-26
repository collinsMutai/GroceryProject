import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  CartItem,
  Item,
  Vendor,
  ApiResponse,
  ApiResponseProduct,
  OrderRequest,
  Product,
} from './Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private vendorsSubject = new BehaviorSubject<Vendor[]>([]);
  private productsSubject = new BehaviorSubject<Item[]>([]);
  private cartSubject = new BehaviorSubject<CartItem[]>(
    this.loadCartFromLocalStorage()
  );

  private APIURL = 'http://localhost:4000/products/';
  private CARTAPIURL = 'http://localhost:4000/cart/';
  private VENDORAPIURL = 'http://localhost:4000/vendors/';
  private api = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {
    this.getAllProducts();
    this.getAllVendors();
  }

  // Add product to the service
  addProduct(newProduct: Item): void {
    this.http
      .post<Item>(`${this.api}products`, newProduct)
      .pipe(
        catchError((error) => {
          console.error('Error adding product:', error);
          return of(null);
        })
      )
      .subscribe(() => {
        this.productsSubject.next([
          ...this.productsSubject.getValue(),
          newProduct,
        ]);
      });
  }
// Update product by ID
updateProduct(updatedProduct: Item): void {
  this.http
    .put<Item>(`${this.api}products/${updatedProduct._id}`, updatedProduct)
    .pipe(
      catchError((error) => {
        console.error('Error updating product:', error);
        return of(null);
      })
    )
    .subscribe((response) => {
      if (response) {
        const updatedProducts = this.productsSubject.getValue().map((product) =>
          product._id === updatedProduct._id ? response : product
        );
        this.productsSubject.next(updatedProducts);
      }
    });
}

  // Delete product by ID
  deleteProduct(_id: string): void {
    this.http
      .delete(`${this.api}products/${_id}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting product:', error);
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          const updatedProducts = this.productsSubject
            .getValue()
            .filter((product) => product._id !== _id);
          this.productsSubject.next(updatedProducts);
        }
      });
  }

  // Fetch all products from the API
  getAllProducts(): void {
    this.http
      .get<ApiResponse>(`${this.api}products`)
      .pipe(
        map((response) => response.products || []),
        catchError((error) => {
          console.error('Error fetching products:', error);
          return of([]);
        })
      )
      .subscribe((products) => {
        this.productsSubject.next(products);
      });
  }

  // Fetch all vendor-specific products
  getAllVendorProducts(vendorId: string): void {
    this.http
      .get<ApiResponse>(`${this.api}products/vendor/${vendorId}`) // Ensure the correct endpoint format
      .pipe(
        map((response) => response.products || []),
        catchError((error) => {
          console.error('Error fetching vendor products:', error);
          return of([]);
        })
      )
      .subscribe((products) => {
        this.productsSubject.next(products);
      });
  }

  // Fetch all vendors from the API
  getAllVendors(): void {
    this.http
      .get<Vendor[]>(`${this.api}vendors`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching vendors:', error);
          return of([]);
        })
      )
      .subscribe((vendors) => {
        this.vendorsSubject.next(vendors);
      });
  }

  // Get vendors observable
  getVendorsObservable(): Observable<Vendor[]> {
    return this.vendorsSubject.asObservable();
  }

  // Other methods remain unchanged

  getProducts(): Item[] {
    return this.productsSubject.getValue();
  }

  getCartObservable(): Observable<any> {
    return this.cartSubject.asObservable();
  }

  getProductsObservable(): Observable<Item[]> {
    return this.productsSubject.asObservable();
  }

  getProductByCategory(category: string): Observable<Item[]> {
    return this.http
      .get<Item[]>(`${this.api}products/category/${category}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching products by category:', error);
          return of([]);
        })
      );
  }

  getProductById(id: string): Observable<ApiResponseProduct> {
    return this.http.get<ApiResponseProduct>(`${this.api}products/${id}`);
  }

  // Add item to the cart
  addToCart(item: CartItem, quantity: number): Observable<CartItem[]> {
    const cartItems = this.cartSubject.getValue();
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({
        _id: item._id,
        quantity,
        price: item.price,
        name: item.name,
        image: item.image,
        vendor: item.vendor,
      });
    }

    this.updateCart(cartItems); // Update the cart in memory and local storage
    return of(cartItems); // Return updated cart items as observable
  }

  // Update item in the cart
  updateCartItem(_id: string, quantity: number): Observable<CartItem[]> {
    const cartItems = this.cartSubject.getValue();
    const item = cartItems.find((cartItem) => cartItem._id === _id);

    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(_id);
      } else {
        this.updateCart(cartItems);
      }
    }

    return of(cartItems); // Return updated cart items as observable
  }

  // Remove item from the cart
  removeFromCart(_id: string): void {
    const cartItems = this.cartSubject
      .getValue()
      .filter((cartItem) => cartItem._id !== _id);
    this.updateCart(cartItems);
  }

  // Retrieve cart from local storage
  private loadCartFromLocalStorage(): CartItem[] {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  }

  // Save cart to local storage
  private saveCartToLocalStorage(cartItems: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  // Update cart in both memory and local storage
  private updateCart(cartItems: CartItem[]): void {
    this.cartSubject.next(cartItems);
    this.saveCartToLocalStorage(cartItems);
  }

  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  // Clear the cart
  clearCart(): void {
    this.cartSubject.next([]);
    localStorage.removeItem('cart');
  }

  // Place an order
  placeOrder(orderRequest: OrderRequest): Observable<any> {
    return this.http.post<any>(`${this.api}orders`, orderRequest).pipe(
      catchError((error) => {
        console.error('Error placing order:', error);
        return of(null);
      })
    );
  }
}
