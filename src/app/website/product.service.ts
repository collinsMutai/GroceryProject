import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, CartData, Item } from './Product'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Item[]>([]);
  private cartSubject = new BehaviorSubject<CartData>({
    cartItems: [],
    subtotal: 0,
    totalQuantity: 0,
  });

  private APIURL = 'http://localhost:4000/products/';
  private CARTAPIURL = 'http://localhost:4000/cart/';
  private api = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
    this.loadCart();
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.http
      .get<Item[]>(`${this.api}allProducts`)
      .pipe(
        map((products) => {
          this.productsSubject.next(products);
        })
      )
      .subscribe({
        error: (error) => {
          console.error('Error fetching products:', error);
        },
      });
  }

  getProducts(): Item[] {
    return this.productsSubject.getValue();
  }

  getProductsObservable(): Observable<Item[]> {
    return this.productsSubject.asObservable();
  }

  getProductByCategory(id: any): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.APIURL}?id=${id}`);
  }

  getProductById(id: any): Observable<Item> {
    return this.http.get<Item>(`${this.api}allProducts/${id}`);
  }

  private itemInCart(itemId: string): Observable<CartItem | undefined> {
    return this.http
      .get<CartItem[]>(this.api + 'cart')
      .pipe(
        map((cartItems) => cartItems.find((item) => item.itemId === itemId))
      );
  }

  addtoCart(cartItem: {
    itemId: string;
    quantity: number;
    price: number;
  }): void {
    this.itemInCart(cartItem.itemId).subscribe((existingItem) => {
      if (existingItem) {
        // If item exists, update quantity
        const updatedQuantity = existingItem.quantity + cartItem.quantity;
        this.updateCartItem(existingItem.itemId, { quantity: updatedQuantity });
      } else {
        // If item does not exist, add new item
        this.http.post<void>(this.api + 'cart', cartItem).subscribe({
          next: () => this.loadCart(),
          error: (error) => {
            console.error('Error adding to cart:', error);
          },
        });
      }
    });
  }

  private loadCart(): void {
    this.http
      .get<CartItem[]>(this.api + 'cart')
      .pipe(
        map((cartItems) => {
          const subtotal = cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          const totalQuantity = cartItems.reduce(
            (acc, item) => acc + item.quantity,
            0
          );
          return { cartItems, subtotal, totalQuantity };
        })
      )
      .subscribe({
        next: (cartData) => {
          this.cartSubject.next(cartData);
        },
        error: (error) => {
          console.error('Error fetching cart:', error);
        },
      });
  }

  get cartData(): CartData {
    return this.cartSubject.getValue();
  }

  getCartObservable(): Observable<CartData> {
    return this.cartSubject.asObservable();
  }
  updateCartItem(itemId: string, updatedData: Partial<CartItem>): void {
    // Fetch all cart items
    this.http.get<CartItem[]>(`${this.api}cart`).subscribe({
      next: (cartItems) => {
        // Find the cart item with the matching itemId
        const itemToUpdate = cartItems.find((item) => item.itemId === itemId);

        if (itemToUpdate) {
          // Combine existing item data with updates from updatedData
          const updatedItem: CartItem = { ...itemToUpdate, ...updatedData };

          // Update the item in the cart using itemId in the URL
          this.http
            .put<void>(`${this.api}cart/${itemId}`, updatedItem)
            .subscribe({
              next: () => {
                // Optionally update the UI immediately
                this.loadCart();
              },
              error: (error) => {
                console.error('Error updating cart item:', error);
                // Optionally show user feedback
              },
            });
        } else {
          console.error('Item with specified itemId not found in cart.');
          // Optionally show user feedback
        }
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
        // Optionally show user feedback
      },
    });
  }

  deleteCartItem(itemId: string): void {
    this.http.delete<void>(`${this.api + 'cart'}/${itemId}`).subscribe({
      next: () => this.loadCart(),
      error: (error) => {
        console.error('Error deleting cart item:', error);
      },
    });
  }
}
