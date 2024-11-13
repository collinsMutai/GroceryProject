import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
} from './Product'; // Update path if needed

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private vendorsSubject = new BehaviorSubject<Vendor[]>([]);
  private productsSubject = new BehaviorSubject<Item[]>([]); // Stores flattened products
  private cartSubject = new BehaviorSubject<CartItem[]>(
    this.loadCartFromLocalStorage()
  );

  private API_URL = 'http://109.123.254.230:8086/api/';
  private CART_API_URL = 'http://localhost:4000/cart/';
  private VENDOR_API_URL = 'http://localhost:4000/vendors/';
  private api = 'http://109.123.254.230:8086/api/';

  constructor(private http: HttpClient) {
    // this.getAllProducts();
    // this.getAllVendors();
  }

  // Fetch all products from the API
  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}products/v1/`);
  }

  getProductById(productId: string): Observable<any> {
    return this.http
      .get<any>(`${this.api}products/v1/get/${productId}`)
      .pipe(catchError(this.handleError('getProductById')));
  }

  // Fetch products by vendor ID
  getAllVendorProducts(vendorId: string): void {
    this.http
      .get<ApiResponse>(`${this.API_URL}products/vendor/${vendorId}`)
      .pipe(
        map((response) => this.flattenProductData(response.products) || []),
        catchError(this.handleError('getAllVendorProducts', []))
      )
      .subscribe((products) => this.productsSubject.next(products));
  }

  // Fetch all vendors from the API
  getAllVendors(): void {
    this.http
      .get<Vendor[]>(`${this.API_URL}vendors`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching vendors:', error);
          return of([]);
        })
      )
      .subscribe((vendors) => this.vendorsSubject.next(vendors));
  }

  // Flatten product data from API response
  private flattenProductData(products: any[]): Item[] {
    return products.map((product) => ({
      _id: product.productId.toString(),
      name: product.productName,
      price: product.pricePerUnit,
      description: product.description,
      category: product.productType.category.title,
      stock: 100, // Adjust stock if available
      image: product.productImage,
      vendor: {
        _id: product.vendor.vendorId.toString(),
        name: `${product.vendor.userInfo.firstName} ${product.vendor.userInfo.lastName}`,
        email: product.vendor.userInfo.email,
        contactNumber: product.vendor.userInfo.msisdn,
        address: product.vendor.address,
      },
    }));
  }

  // Get products observable
  getProductsObservable(): Observable<Item[]> {
    return this.productsSubject.asObservable();
  }

  // Add a new product to the API and update the local products state
  addProduct(newProduct: Item): void {
    this.http
      .post<Item>(`${this.api}products`, newProduct)
      .pipe(
        catchError((error) => {
          console.error('Error adding product:', error);
          return of(null); // Return null in case of error
        })
      )
      .subscribe(() => {
        this.productsSubject.next([
          ...this.productsSubject.getValue(),
          newProduct,
        ]);
      });
  }

  // Update an existing product by ID
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
          const updatedProducts = this.productsSubject
            .getValue()
            .map((product) =>
              product._id === updatedProduct._id ? response : product
            );
          this.productsSubject.next(updatedProducts);
        }
      });
  }

  // Delete a product by ID
  deleteProduct(_id: string): void {
    this.http
      .delete(`${this.api}products/${_id}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting product:', error);
          return of(null);
        })
      )
      .subscribe(() => {
        const updatedProducts = this.productsSubject
          .getValue()
          .filter((product) => product._id !== _id);
        this.productsSubject.next(updatedProducts);
      });
  }

  // Cart-related methods
  getCartObservable(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  private loadCartFromLocalStorage(): CartItem[] {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  }

  private saveCartToLocalStorage(cartItems: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  private updateCart(cartItems: CartItem[]): void {
    this.cartSubject.next(cartItems);
    this.saveCartToLocalStorage(cartItems);
  }

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

    this.updateCart(cartItems);
    return of(cartItems);
  }

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

    return of(cartItems);
  }

  removeFromCart(_id: string): void {
    const cartItems = this.cartSubject
      .getValue()
      .filter((cartItem) => cartItem._id !== _id);
    this.updateCart(cartItems);
  }

  clearCart(): void {
    this.cartSubject.next([]);
    localStorage.removeItem('cart');
  }

  placeOrder(orderRequest: OrderRequest): Observable<any> {
    return this.http.post<any>(`${this.api}orders`, orderRequest).pipe(
      catchError((error) => {
        console.error('Error placing order:', error);
        return of(null);
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
