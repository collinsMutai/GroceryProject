import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CartItem, Item, ApiResponse, ApiResponseProduct } from './Product'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Item[]>([]);
  private cartSubject = new BehaviorSubject<CartItem[]>(
    this.loadCartFromLocalStorage()
  );

  private APIURL = 'http://localhost:4000/products/';
  private CARTAPIURL = 'http://localhost:4000/cart/';
  private api = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) {
    this.getAllProducts();
  }

  // Fetch all products from the API
  getAllProducts(): void {
    this.http
      .get<ApiResponse>(`${this.api}products`)
      .pipe(
        map((response) => response.products || []),
        catchError((error) => {
          console.error('Error fetching products:', error);
          return of([]); // Return an observable with an empty array
        })
      )
      .subscribe((products) => {
        this.productsSubject.next(products);
      });
  }

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
  addToCart(item: CartItem, quantity: number): void {
    const cartItems = this.cartSubject.getValue();
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      console.log('add', cartItems);
    } else {
      cartItems.push({ _id: item._id, quantity, price: item.price, name: item.name, image: item.image});
      console.log('update', cartItems);
    }

    this.updateCart(cartItems);
  }

  // Update item in the cart
  updateCartItem(_id: string, quantity: number): void {
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
}
