import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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

  getCart(id: any): Observable<any> {
    return this.http.get(`${this.CARTAPIURL}?CustId=${id}`);
  }

  updateCartItem(cartItemId: any, obj: any): Observable<any> {
    return this.http.put(`${this.CARTAPIURL}${cartItemId}`, obj);
  }

  deleteCartItem(id: any): Observable<any> {
    return this.http.delete(this.CARTAPIURL + id);
  }
}
