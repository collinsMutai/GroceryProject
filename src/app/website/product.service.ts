import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartUpdated: Subject<boolean> = new Subject<boolean>();

  private APIURL = 'http://localhost:3000/products/';
  private CARTAPIURL = 'http://localhost:3000/cart/';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(this.APIURL);
  }

  getProductByCategory(id: any): Observable<any> {
    return this.http.get(`${this.APIURL}?id=${id}`);
  }

  addtoCart(obj: any): Observable<any> {
    return this.http.post(this.CARTAPIURL, obj);
  }

  getCart(): Observable<any> {
    return this.http.get<any[]>(this.CARTAPIURL).pipe(
      map((cartItems) => {
        const subtotal = cartItems.reduce((acc, item) => acc + item.Total, 0);
        const totalQuantity = cartItems.reduce(
          (acc, item) => acc + item.Quantity,
          0
        );
        return { cartItems, subtotal, totalQuantity };
      })
    );
  }

  updateCartItem(id: any, obj: any): Observable<any> {
    return this.http.put(`${this.CARTAPIURL}${id}`, obj);
  }

  deleteCartItem(id: any): Observable<any> {
    return this.http.delete(this.CARTAPIURL + id);
  }
}
